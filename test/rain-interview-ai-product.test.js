import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("トップページは制作・集客支援を主役にする", () => {
  assert.match(homepage, /現場の一次情報を/);
  assert.match(homepage, /HP・LP制作/);
  assert.match(homepage, /AI広告・集客設計/);
  assert.match(homepage, /写真を送る。<br>AIが整える。<br>人が決める。/);
});

test("トップページではプロダクトを実績として整理する", () => {
  assert.match(homepage, /10を超える開発経験を/);
  assert.match(homepage, /14 PRODUCTS/);
  assert.match(homepage, /Rain Interview AI/);
  assert.doesNotMatch(homepage, /3か月の有償実証を受付中/);
  assert.doesNotMatch(homepage, /id="products"/);
});

test("Next.jsを軸にした次世代型Webの違いを明示する", () => {
  assert.match(homepage, /WordPress前提から/);
  assert.match(homepage, /NEXT\.JS \/ AI READY/);
  assert.match(homepage, /サーバー側の入力検証と権限設計/);
  assert.match(homepage, /AI・LINE・Buffer・広告計測へ拡張/);
});

test("AI更新構想を提供済みと誤認させない", () => {
  assert.match(homepage, /予約配信構想/);
  assert.match(homepage, /現在、案件ごとの導入設計・開発相談を受付中/);
  assert.match(homepage, /AIが下書きを作り、人が確認したうえで/);
});
