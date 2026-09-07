import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const ARTICLE_URL = new URL("../blog/lp-production-ai-era.html", import.meta.url);

test("LP制作開始の記事にAI時代の役割・料金・安全な表現がある", async () => {
  const html = await readFile(ARTICLE_URL, "utf8");

  assert.match(html, /LP制作を始めました/);
  assert.match(html, /19,800円から/);
  assert.match(html, /公式な受け皿/);
  assert.match(html, /AIにも、事業内容を/);
  assert.match(html, /AIに表示されることを保証するものではありません/);
  assert.match(html, /href="\/lp-production"/);
  assert.match(html, /<script src="\/gtm-mail-click\.js" defer><\/script>/);
});

test("ブログ一覧とサイトマップから新記事へ到達できる", async () => {
  const [blog, sitemap] = await Promise.all([
    readFile(new URL("../blog.html", import.meta.url), "utf8"),
    readFile(new URL("../sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(blog, /href="\/blog\/lp-production-ai-era"/);
  assert.match(blog, /AI時代に「1ページ」のホームページが必要な理由/);
  assert.match(sitemap, /https:\/\/www\.rainaiproject\.com\/blog\/lp-production-ai-era/);
});
