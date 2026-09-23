import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const INDEX_URL = new URL("../index.html", import.meta.url);
const IMAGE_URL = new URL("../assets/products/feng-shui-floorplan.png", import.meta.url);
const LINE_SCREEN_URL = new URL("../assets/products/ouchifusui-line-screen.png", import.meta.url);

test("トップページで住まいの方位レポートを視覚的に案内する", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /class="product-spotlight"/);
  assert.match(html, /間取り図から、<br>風水説明レポートを約1分で/);
  assert.match(html, /href="https:\/\/ouchifusui\.rainaiproject\.com\/product"/);
  assert.match(html, /NEW｜不動産営業向けAI/);
  assert.match(html, /assets\/products\/feng-shui-floorplan\.png/);
  await access(IMAGE_URL);
});

test("トップページにおうち風水の新カードを掲載する", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /class="product-spotlight-card ouchifusui-spotlight-card"/);
  assert.match(html, /NEW｜LINEでできるおうち風水/);
  assert.match(html, /href="https:\/\/ouchifusui\.rainaiproject\.com\/"/);
  assert.match(html, /assets\/products\/ouchifusui-line-screen\.png/);
  await access(LINE_SCREEN_URL);
});

test("プロダクト一覧に無料公開カードを掲載する", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /class="product-card product-card-link fengshui-product-card"/);
  assert.match(html, />住まいの方位レポート<\/h3>/);
  assert.match(html, /公開・期間限定無料/);
  assert.match(html, /無料でレポートを作る/);
  assert.match(html, /class="product-card product-card-link ouchifusui-product-card"/);
  assert.match(html, />Rain AI \| おうち風水<\/h3>/);
  assert.match(html, /NEW｜無料公開中/);
});

test("構造化データにも住まいの方位レポートを掲載する", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /"name": "住まいの方位レポート"/);
  assert.match(html, /"url": "https:\/\/ouchifusui\.rainaiproject\.com\/product"/);
  assert.match(html, /"name": "Rain AI \| おうち風水"/);
  assert.match(html, /"url": "https:\/\/ouchifusui\.rainaiproject\.com\/"/);
  assert.match(html, /"price": "0"/);
});
