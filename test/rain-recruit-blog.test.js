import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const article = readFileSync(
  new URL("../blog/rain-recruit-mobile-application.html", import.meta.url),
  "utf8",
);
const blogIndex = readFileSync(new URL("../blog.html", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");

test("Rain Recruit記事はIndeedの数値と条件を正確に表示する", () => {
  assert.match(article, /応募の79％はスマホから/);
  assert.match(article, /Indeed Applyを有効にした求人/);
  assert.match(article, /Rain Recruitを導入すると応募数が40％増える、という意味ではありません/);
});

test("記事からRain Recruit公式サイトへ移動できる", () => {
  assert.match(article, /https:\/\/recruit\.rainaiproject\.com\//);
  assert.match(article, /最終的な判断は企業の採用担当者が行う/);
});

test("ブログ一覧とサイトマップから新記事へ到達できる", () => {
  assert.match(blogIndex, /\/blog\/rain-recruit-mobile-application/);
  assert.match(sitemap, /\/blog\/rain-recruit-mobile-application/);
});
