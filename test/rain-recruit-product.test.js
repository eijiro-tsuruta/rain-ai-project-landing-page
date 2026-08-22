import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("トップページのプロダクト一覧からRain Recruitへ移動できる", () => {
  assert.match(homepage, /<h3 style="margin-top:14px;">Rain Recruit<\/h3>/);
  assert.match(homepage, /href="https:\/\/recruit\.rainaiproject\.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(homepage, /LINE応募体験・機能・料金を見る/);
});

test("Rain Recruitの公開料金と安全な面接機能名を表示する", () => {
  assert.match(homepage, /初期設定費98,000円/);
  assert.match(homepage, /月額25,000円/);
  assert.match(homepage, /LINE Developersアカウントの取得・初期設定/);
  assert.doesNotMatch(homepage, /AIが採用・不採用を決定/);
});

test("構造化データにもRain Recruitを掲載する", () => {
  assert.match(homepage, /"name": "Rain Recruit"/);
  assert.match(homepage, /"price": "25000"/);
  assert.match(homepage, /"description": "初期設定費98,000円/);
  assert.match(homepage, /"url": "https:\/\/recruit\.rainaiproject\.com\/"/);
  assert.doesNotMatch(homepage, /rain-recruit-lp\.vercel\.app/);
});
