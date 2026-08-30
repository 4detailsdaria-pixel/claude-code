// Перетворює dist-single/index.html у фрагмент для публікації прев'ю:
// хостинг сам обгортає файл у <!doctype html><head>…</head><body>,
// тому власні html/head/body треба прибрати.
//
// Витягувати <style> регуляркою не можна: інлайнений бандл містить
// літерал "<style" всередині JS-рядка і регулярка з'їдає півфайлу.
// Тому беремо <head> цілком, прибираємо лише <meta> і піднімаємо <title>
// на початок — його шукають у перших кілобайтах файлу.
import fs from 'node:fs';

const src = fs.readFileSync('dist-single/index.html', 'utf8');
const headInner = src.match(/<head>([\s\S]*)<\/head>/)[1];
const bodyInner = src.match(/<body>([\s\S]*)<\/body>/)[1];

const title = headInner.match(/<title>[\s\S]*?<\/title>/)?.[0] ?? '';
const rest = headInner
  .replace(title, '')
  .replace(/<meta\b[^>]*>/g, '')
  .trim();

const out = `${title}\n${rest}\n${bodyInner.trim()}\n`;
fs.mkdirSync('dist-artifact', { recursive: true });
fs.writeFileSync('dist-artifact/futurium-preview.html', out);

const forbidden = /<!doctype|<html|<\/html>|<head>|<body>/i.exec(out);
console.log('written', (out.length / 1024 / 1024).toFixed(2), 'MB');
console.log('wrapper tags left:', forbidden ? forbidden[0] : 'none');
console.log('title in first 8KB:', out.slice(0, 8192).includes('<title>'));
