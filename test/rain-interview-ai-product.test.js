import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("トップページのプロダクト一覧からRain Interview AIへ移動できる", () => {
  assert.match(homepage, /<h3 style="margin-top:14px;">Rain Interview AI<\/h3>/);
  assert.match(homepage, /href="https:\/\/interview\.rainaiproject\.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(homepage, /仕組み・安全設計・実証内容を見る/);
});

test("Rain Interview AIの提供方針を正確に表示する", () => {
  assert.match(homepage, /3か月の有償実証を受付中/);
  assert.match(homepage, /AIに採否を決めさせず/);
  assert.match(homepage, /面接の説明責任を人に残す/);
});

test("構造化データにもRain Interview AIを掲載する", () => {
  assert.match(homepage, /"name": "Rain Interview AI"/);
  assert.match(homepage, /"url": "https:\/\/interview\.rainaiproject\.com\/"/);
  assert.doesNotMatch(homepage, /rain-interview-ai\.vercel\.app/);
});
