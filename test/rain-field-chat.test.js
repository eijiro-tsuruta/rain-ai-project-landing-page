import assert from "node:assert/strict";
import test from "node:test";

import { buildChatInstructions, handleChat } from "../lib/chat-service.js";
import {
  buildRainFieldContext,
  isRainFieldQuery,
  retrieveRainFieldKnowledge,
} from "../lib/rain-field-knowledge.js";

function messages(question) {
  return [{ role: "user", content: question }];
}

function retrievedIds(question) {
  return retrieveRainFieldKnowledge(messages(question)).map((chunk) => chunk.id);
}

test("Rain Fieldの操作質問とRain AIのサービス相談を区別する", () => {
  assert.equal(isRainFieldQuery(messages("クラウドに保存・同期できますか？")), true);
  assert.equal(isRainFieldQuery(messages("自由入力した項目が発注書に出ません")), true);
  assert.equal(isRainFieldQuery(messages("チャットボット制作の参考価格はいくらですか？")), false);
});

test("質問に対応する説明書チャンクを取得する", () => {
  assert.ok(retrievedIds("写真画像はAIに送られますか？").includes("photos-reports-documents"));
  assert.ok(retrievedIds("仕入価格を変更したら見積書も変わりますか？").includes("material-search-and-price-history"));
  assert.ok(retrievedIds("自由入力した項目が発注書に出ません").includes("estimates"));
  assert.ok(retrievedIds("発注数が0になります").includes("automatic-order-quantity"));
  assert.ok(retrievedIds("仕入先未設定で印刷できません").includes("purchase-orders"));
  assert.ok(retrievedIds("案件を削除したら写真は残りますか？").includes("projects"));
});

test("発注数量の計算例を取得する", () => {
  const context = buildRainFieldContext(messages("185㎡で1缶60㎡、ロス8%、2缶単位なら何缶？"));
  assert.match(context, /発注数4缶/);
  assert.match(context, /第11章・19〜20ページ/);
});

test("最新の保存・共有方針を回答知識へ含める", () => {
  const context = buildRainFieldContext(messages("クラウド保存やGoogle Drive共有はできますか？"));
  assert.match(context, /クラウドへ保存・同期する予定はありません/);
  assert.match(context, /サイトデータを削除すると、Rain Field内のデータは消失します/);
  assert.match(context, /利用者自身が用意・設定したGoogle Drive/);
  assert.match(context, /準備・設定・管理は、すべて利用者側/);
  assert.match(context, /Rain Field側では用意・提供・設定・管理しません/);
  assert.match(context, /自動連携や自動同期ではありません/);
  assert.match(context, /Rain Field公式運用方針/);
});

test("Rain Fieldの回答指示には推測禁止と出典表記を含める", () => {
  const instructions = buildChatInstructions(messages("Rain Fieldの料金と今後の機能を教えて"));
  assert.match(instructions, /料金、将来仕様、クラウド連携を推測しない/);
  assert.match(instructions, /取扱説明書または公式運用方針には記載がなく、確認が必要/);
  assert.match(instructions, /回答末尾に「参照: 取扱説明書/);
});

test("既存のResponses API設定を維持して関連知識だけを送る", async () => {
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
      body: { messages: messages("クラウドに保存・同期できますか？") },
      ip: "test-rain-field",
    });

    assert.equal(result.status, 200);
    assert.equal(result.body.answer, "テスト回答");
    assert.equal(requestBody.store, false);
    assert.equal(requestBody.max_output_tokens, 700);
    assert.match(requestBody.instructions, /今回の質問に関連するRain Field知識/);
    assert.match(requestBody.instructions, /クラウドへ保存・同期する予定はありません/);
    assert.doesNotMatch(requestBody.instructions, /Excel・CSVからの材料一括取り込み/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
  }
});

test("Rain AIのサービス相談にはRain Fieldの章本文を追加しない", () => {
  const instructions = buildChatInstructions(messages("チャットボット制作の参考価格はいくらですか？"));
  assert.match(instructions, /案内・FAQ型: 初期15万〜30万円/);
  assert.doesNotMatch(instructions, /今回の質問に関連するRain Field知識/);
});
