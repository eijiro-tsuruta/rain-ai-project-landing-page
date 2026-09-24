import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildChatInstructions } from "../lib/chat-service.js";

const LP_URL = new URL("../lp-production.html", import.meta.url);
const INDEX_URL = new URL("../index.html", import.meta.url);

test("LP制作ページに3プランの価格と役割を明示する", async () => {
  const html = await readFile(LP_URL, "utf8");

  assert.match(html, /店舗LP/);
  assert.match(html, /50,000円/);
  assert.match(html, /投稿できるLP/);
  assert.match(html, /月額 9,800円/);
  assert.match(html, /ズボラLP/);
  assert.match(html, /月額 29,800円/);
  assert.match(html, /独自ドメイン取得をサポート/);
  assert.match(html, /Google Business Profile整備/);
  assert.match(html, /AIにも見つけてもらう/);
  assert.match(html, /写真・ロゴ・基本情報はお客様/);
  assert.match(html, /data-gtm-event="mail_click"/);
  assert.match(html, /<script src="\/chatbot\.js\?v=20260907-1" defer><\/script>/);
});

test("トップページからLP制作ページへ移動できる", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /<h3>HP・LP制作<\/h3>/);
  assert.match(html, /href="\/lp-production#plans"[^>]*>料金と実物を見る/);
  assert.match(html, /href="\/lp-production#plans"[^>]*>料金と3つのサンプルを見る/);
});

test("3つのLPサンプルと制作ページからの導線がある", async () => {
  const lp = await readFile(LP_URL, "utf8");
  const cafe = await readFile(new URL("../samples/cafe.html", import.meta.url), "utf8");
  const italian = await readFile(new URL("../samples/italian.html", import.meta.url), "utf8");
  const washoku = await readFile(new URL("../samples/washoku-ai.html", import.meta.url), "utf8");

  assert.match(lp, /href="\/samples\/cafe"/);
  assert.match(lp, /href="\/samples\/italian"/);
  assert.match(lp, /href="\/samples\/washoku-ai"/);
  assert.match(lp, /cafe-komorebi-hero\.jpg/);
  assert.match(cafe, /喫茶 木漏れ日/);
  assert.match(cafe, /店舗情報は架空/);
  assert.match(italian, /TRATTORIA LUCE/);
  assert.match(italian, /投稿画面を試す/);
  assert.match(italian, /この内容で投稿する/);
  assert.match(washoku, /旬菜 かさね/);
  assert.match(washoku, /AI更新を試す/);
  assert.match(washoku, /LP公開＋Buffer予約/);
});

test("相談BotがLP制作の公開料金と条件を案内できる", () => {
  const instructions = buildChatInstructions([
    { role: "user", content: "LP制作の3つの料金について教えて" },
  ]);

  assert.match(instructions, /店舗LP: 50,000円/);
  assert.match(instructions, /投稿できるLP: 初期50,000円から、月額9,800円/);
  assert.match(instructions, /ズボラLP: 初期98,000円から、月額29,800円/);
  assert.match(instructions, /写真撮影は含まない/);
  assert.match(instructions, /検索順位、AI検索での引用、問い合わせ数は保証しない/);
});

test("相談BotがLP制作のURL・制作範囲・進め方を案内できる", () => {
  const instructions = buildChatInstructions([
    { role: "user", content: "LP制作の内容と進め方、公式ページを教えて" },
  ]);

  assert.match(instructions, /https:\/\/www\.rainaiproject\.com\/lp-production/);
  assert.match(instructions, /構造化データ・Google Business Profileとの情報整合・クロール設定/);
  assert.match(instructions, /制作後にスマートフォン表示を含めて内容を確認/);
  assert.match(instructions, /生成AIチャットBotは初期150,000円から・月額29,800円から/);
});
