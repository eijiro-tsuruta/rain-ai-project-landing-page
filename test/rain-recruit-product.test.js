import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepage = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("Rain Recruitは技術・開発実績として控えめに掲載する", () => {
  assert.match(homepage, /<h3>Rain Recruit<\/h3>/);
  assert.match(homepage, /href="https:\/\/recruit\.rainaiproject\.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(homepage, /企業側の採用管理まで支援するシステム/);
});

test("代表プロダクトは実画面画像つきで掲載する", () => {
  assert.match(homepage, /<h3>LINE予約Bot<\/h3>/);
  assert.match(homepage, /line-booking-chat\.jpg/);
  assert.match(homepage, /generated-copy\.png/);
  assert.match(homepage, /rain-field-project-detail\.png/);
  assert.match(homepage, /rain-recruit-mobile-application-ogp\.png/);
});

test("トップページでは個別プロダクトの料金訴求を前面に出さない", () => {
  assert.doesNotMatch(homepage, /初期設定費98,000円/);
  assert.doesNotMatch(homepage, /月額25,000円/);
  assert.doesNotMatch(homepage, /"name": "Rain Recruit"/);
});

test("プロダクトをWebと業務改善へ還元する方針を表示する", () => {
  assert.match(homepage, /10を超える開発経験を、<br>顧客のWebへ/);
  assert.match(homepage, /得られた技術を顧客のWebと業務改善へ活かします/);
});
