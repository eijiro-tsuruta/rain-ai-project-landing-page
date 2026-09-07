import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildChatInstructions } from "../lib/chat-service.js";

const LP_URL = new URL("../lp-production.html", import.meta.url);
const INDEX_URL = new URL("../index.html", import.meta.url);

test("LP制作ページに価格・対象・初期設定サポートを明示する", async () => {
  const html = await readFile(LP_URL, "utf8");

  assert.match(html, /LP制作 19,800円〜/);
  assert.match(html, /個人事業主・一人親方・小規模事業者/);
  assert.match(html, /独自ドメイン取得をサポート/);
  assert.match(html, /Google Business Profile整備/);
  assert.match(html, /AIにも見つけてもらう/);
  assert.match(html, /data-gtm-event="mail_click"/);
});

test("トップページからLP制作ページへ移動できる", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /href="\/lp-production"[^>]*>[\s\S]*?LP制作 19,800円〜/);
});

test("実際のカフェLPサンプルと制作ページからの導線がある", async () => {
  const lp = await readFile(LP_URL, "utf8");
  const sample = await readFile(new URL("../samples/cafe.html", import.meta.url), "utf8");

  assert.match(lp, /href="\/samples\/cafe"/);
  assert.match(lp, /cafe-komorebi-hero\.jpg/);
  assert.match(lp, /一杯ずつ、[\s\S]*ゆっくりと。/);
  assert.doesNotMatch(lp, /架空のカフェLPを/);
  assert.match(sample, /喫茶 木漏れ日/);
  assert.match(sample, /cafe-komorebi-hero\.jpg/);
  assert.match(sample, /cafe-komorebi-menu\.jpg/);
  assert.match(sample, /店舗情報は架空/);
});

test("相談BotがLP制作の公開料金と条件を案内できる", () => {
  const instructions = buildChatInstructions([
    { role: "user", content: "19,800円のホームページ制作について教えて" },
  ]);

  assert.match(instructions, /1ページ構成は19,800円から/);
  assert.match(instructions, /独自ドメインの取得費、追加機能、原稿作成、写真撮影、公開後の更新/);
  assert.match(instructions, /検索順位、AI検索での引用、問い合わせ数は保証しない/);
});
