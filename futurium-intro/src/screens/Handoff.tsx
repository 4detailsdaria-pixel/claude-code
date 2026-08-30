/** Проміжний стан між приватним і презентаційним режимом. */
export function Handoff({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="w-full max-w-[520px] rounded-3xl bg-periwinkle px-12 py-14 text-center">
        <h2 className="brand-title text-[26px] leading-tight">
          Далі — те,
          <br />
          що бачить клієнт
        </h2>
        <p className="mt-5 text-[16px] text-black/70">Увімкніть демонстрацію екрана</p>
        <button
          type="button"
          onClick={onStart}
          className="mt-9 rounded-full bg-black px-9 py-3.5 text-[15px] text-white"
        >
          Почати презентацію
        </button>
      </div>
    </div>
  );
}
