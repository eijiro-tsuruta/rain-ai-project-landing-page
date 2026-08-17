import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { buildChatInstructions, handleChat } from "../lib/chat-service.js";
import {
  AI_SENDEN_KNOWLEDGE,
  buildAiSendenContext,
  isAiSendenQuery,
  retrieveAiSendenKnowledge,
} from "../lib/ai-senden-knowledge.js";

function messages(question) {
  return [{ role: "user", content: question }];
}

const coverageCases = [
  ["AI宣伝しとけの取説のURLを出せますか？", "official-links", /https:\/\/www\.rainaiproject\.com\/products\/ai-senden-guide/],
  ["AI宣伝しとけのPDFマニュアルはどこですか？", "official-links", /https:\/\/www\.rainaiproject\.com\/output\/pdf\/ai-senden-user-guide\.pdf/],
  ["AI宣伝しとけの利用規約のリンクを教えて", "official-links", /https:\/\/www\.rainaiproject\.com\/terms\.html/],
  ["AI宣伝しとけは何ができて、どこから登録できますか？", "overview-and-access", /ai-senden\.rainaiproject\.com\/register/],
  ["AI宣伝しとけはInstagramの個人用アカウントで使えますか？", "overview-and-access", /プロアカウント.*必要/],
  ["AI宣伝しとけの無料体験でカード登録は必要ですか？", "free-trial-and-login", /クレジットカード登録は不要/],
  ["AI宣伝しとけの無料体験は何回生成できますか？", "free-trial-and-login", /AI文章生成を10回まで/],
  ["AI宣伝しとけとInstagramのログイン情報は同じですか？", "free-trial-and-login", /ログイン情報は別/],
  ["AI宣伝しとけをInstagramと連携する手順は？", "instagram-connection", /MetaのWeb画面で許可/],
  ["Metaの画面には何のログイン情報を入れますか？", "instagram-connection", /Instagram側のログイン情報/],
  ["AI宣伝しとけで別のInstagramアカウントに切り替えるには？", "instagram-connection", /「…」から「アカウントを切り替える」/],
  ["55日目にInstagramと連携が外れたのはなぜ？", "instagram-reauthorization", /60日間の認証期限/],
  ["AI宣伝しとけの料金と投稿上限は？", "pricing-and-payment", /月額1,000円.*月10回/],
  ["AI宣伝しとけでApple PayやGoogle Payは使えますか？", "pricing-and-payment", /Apple Pay、Google Pay、Link/],
  ["AI宣伝しとけを解約する手順は？", "cancellation-and-deletion", /「サブスクリプションをキャンセル」/],
  ["サブスクを続けると表示されたら解約済みですか？", "cancellation-and-deletion", /解約予約は完了/],
  ["AI宣伝しとけで写真から投稿する手順を教えて", "create-and-publish-post", /最大5枚/],
  ["Instagramへ公開するを押すと実際に投稿されますか？", "create-and-publish-post", /実際の投稿操作/],
  ["AI宣伝しとけの処理が遅いのでボタンをもう一度押してよいですか？", "processing-and-posting-safety", /同じボタンを続けて押さず/],
  ["同じ内容を連続投稿するとどうなりますか？", "processing-and-posting-safety", /スパムと判断/],
  ["AI宣伝しとけをSafariのホーム画面に追加するには？", "pwa-home-screen", /「ホーム画面に追加」→「追加」/],
  ["AI宣伝しとけが作った文章は確認せず公開してよいですか？", "terms-and-content-responsibility", /正確性・有用性は保証されません/],
];

test("Web取扱説明書はホーム画面への追加を3番目に案内する", () => {
  const guide = fs.readFileSync(new URL("../products/ai-senden-guide.html", import.meta.url), "utf8");
  const chapterIds = [...guide.matchAll(/<section class="chapter(?: faq)?" id="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual(chapterIds, [
    "prepare",
    "start",
    "pwa",
    "connect",
    "billing",
    "cancel",
    "use",
    "slow",
    "faq",
  ]);
  assert.match(guide, /href="#pwa">03 ホーム画面に追加/);
  assert.match(guide, /id="pwa"[\s\S]*?<div class="chapter-no">03<\/div>/);
  assert.match(guide, /id="connect"[\s\S]*?<div class="chapter-no">04<\/div>/);
});

test("AI宣伝しとけのLP・取扱説明書・利用規約の主要項目を検索できる", () => {
  assert.equal(AI_SENDEN_KNOWLEDGE.length, 11);

  for (const [question, expectedId, expectedText] of coverageCases) {
    const matches = retrieveAiSendenKnowledge(messages(question));
    const ids = matches.map((chunk) => chunk.id);
    const context = buildAiSendenContext(messages(question));

    assert.ok(ids.includes(expectedId), `${question}: expected ${expectedId}, got ${ids.join(", ") || "none"}`);
    assert.match(context, expectedText, `${question}: expected answer evidence was not retrieved`);
  }
});

test("AI宣伝しとけの質問と他サービスの相談を区別する", () => {
  assert.equal(isAiSendenQuery(messages("AI宣伝しとけの料金は？")), true);
  assert.equal(isAiSendenQuery(messages("Instagramと連携済みになりません")), true);
  assert.equal(isAiSendenQuery(messages("Rain Fieldで見積書を作る方法は？")), false);
  assert.equal(isAiSendenQuery(messages("LINE予約Botの月額はいくらですか？")), false);
  assert.equal(isAiSendenQuery(messages("チャットボット制作の料金は？")), false);
});

test("AI宣伝しとけの会話中は短い追質問にも文脈を引き継ぐ", () => {
  const conversation = [
    { role: "user", content: "AI宣伝しとけのライトプランについて教えて" },
    { role: "assistant", content: "月額料金について説明します。" },
    { role: "user", content: "解約はどうしますか？" },
  ];
  const context = buildAiSendenContext(conversation);
  assert.match(context, /解約・解約完了の確認/);
  assert.match(context, /「サブスクを続ける」/);
});

test("写真などの共通語があってもAI宣伝しとけとRain Fieldの知識を混同しない", () => {
  const aiSendenInstructions = buildChatInstructions(messages("AI宣伝しとけで写真から投稿する手順は？"));
  assert.match(aiSendenInstructions, /\n## 今回の質問に関連するAI宣伝しとけ知識/);
  assert.doesNotMatch(aiSendenInstructions, /\n## 今回の質問に関連するRain Field知識/);

  const rainFieldInstructions = buildChatInstructions(messages("Rain Fieldで写真を登録する手順は？"));
  assert.match(rainFieldInstructions, /\n## 今回の質問に関連するRain Field知識/);
  assert.doesNotMatch(rainFieldInstructions, /\n## 今回の質問に関連するAI宣伝しとけ知識/);

  const mixedInstructions = buildChatInstructions(messages("Rain FieldとAI宣伝しとけの写真の扱いをそれぞれ教えて"));
  assert.match(mixedInstructions, /\n## 今回の質問に関連するRain Field知識/);
  assert.match(mixedInstructions, /\n## 今回の質問に関連するAI宣伝しとけ知識/);
});

test("AI宣伝しとけの回答指示は推測禁止・公開前確認・出典表記を含む", () => {
  const instructions = buildChatInstructions(messages("AI宣伝しとけのスタンダードプランと今後の機能は？"));
  assert.match(instructions, /関連知識にない機能、料金、プラン、上限、Instagram・Meta側の挙動を推測しない/);
  assert.match(instructions, /これ以外のプラン内容を作らない/);
  assert.match(instructions, /写真、文章、ハッシュタグ、投稿先を利用者自身が確認/);
  assert.match(instructions, /提示された「出典:」を回答末尾へ「参照: ○○」/);
});

test("取扱説明書URLの質問には公開URLを必ず渡す", () => {
  const instructions = buildChatInstructions(messages("AI宣伝しとけの取説のURLを出せますか？"));
  assert.match(instructions, /https:\/\/www\.rainaiproject\.com\/products\/ai-senden-guide/);
  assert.match(instructions, /https:\/\/www\.rainaiproject\.com\/output\/pdf\/ai-senden-user-guide\.pdf/);
  assert.match(instructions, /「公開情報に記載がない」とは回答しない/);
});

test("AI宣伝しとけの質問ではResponses APIへ関連知識だけを送り保存しない", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  let requestBody;

  process.env.OPENAI_API_KEY = "test-key-not-sent-anywhere";
  globalThis.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({ output_text: "テスト回答" }),
    };
  };

  try {
    const result = await handleChat({
      method: "POST",
      body: { messages: messages("AI宣伝しとけを解約するには？") },
      ip: "test-ai-senden",
    });

    assert.equal(result.status, 200);
    assert.equal(result.body.answer, "テスト回答");
    assert.equal(requestBody.store, false);
    assert.match(requestBody.instructions, /今回の質問に関連するAI宣伝しとけ知識/);
    assert.match(requestBody.instructions, /「サブスクを続ける」に変わり/);
    assert.doesNotMatch(requestBody.instructions, /写真から投稿文を作りInstagramへ公開する\n出典/);
    assert.doesNotMatch(requestBody.instructions, /\n## 今回の質問に関連するRain Field知識/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
  }
});

test("Rain AIの一般相談にはAI宣伝しとけの取扱説明書本文を追加しない", () => {
  const instructions = buildChatInstructions(messages("ホームページAIチャットボットの料金は？"));
  assert.doesNotMatch(instructions, /\n## 今回の質問に関連するAI宣伝しとけ知識/);
  assert.doesNotMatch(instructions, /55日目にInstagram連携だけ/);
});
