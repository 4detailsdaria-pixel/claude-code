/**
 * Опубліковане прев'ю живе в пісочниці, де сторінці заборонено самій
 * ініціювати завантаження: звичайне <a download> там мовчки нічого не
 * робить. Хост натомість дає capability `downloads`, яка показує глядачу
 * підтвердження й зберігає файл.
 *
 * На Vercel цього API немає — там працює звичайний якір. Тому пробуємо
 * хостовий шлях, а якщо його немає, падаємо на якір.
 */

interface HostDownloads {
  save(request: { filename: string; data: Blob }): Promise<{ status: 'saved' }>;
}

interface ClaudeHost {
  use(name: 'downloads'): Promise<HostDownloads | null>;
}

function host(): ClaudeHost | null {
  return (globalThis as { claude?: ClaudeHost }).claude ?? null;
}

export type SaveOutcome = 'saved' | 'declined' | 'failed';

export async function saveFile(filename: string, blob: Blob): Promise<SaveOutcome> {
  const claude = host();

  if (claude?.use) {
    try {
      const downloads = await claude.use('downloads');
      if (downloads) {
        await downloads.save({ filename, data: blob });
        return 'saved';
      }
    } catch (e) {
      // Глядач міг просто відмовитись — це не помилка, і повторювати не треба.
      const code = (e as { code?: string })?.code;
      if (code === 'declined') return 'declined';
      if (code) return 'failed';
    }
  }

  // Звичайний браузер: якір із download.
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return 'saved';
}
