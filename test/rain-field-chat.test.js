import assert from "node:assert/strict";
import test from "node:test";

import { buildChatInstructions, handleChat } from "../lib/chat-service.js";
import {
  RAIN_FIELD_KNOWLEDGE,
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

const manualCoverageCases = [
  ["取扱説明書は何ページで、いつ発行されましたか？", "manual-metadata-and-contents", /全27ページ/],
  ["Rain FieldのWeb URLはどこですか？", "manual-metadata-and-contents", /rainfield-mvp\.vercel\.app/],
  ["別のパソコンやシークレットウィンドウと共有できますか？", "getting-started-and-storage", /共有されません/],
  ["見積書をPDFで保存できますか？", "getting-started-and-storage", /ブラウザの印刷機能を使ってPDF化/],
  ["写真画像そのものをAIへ送信しますか？", "getting-started-and-storage", /写真画像そのものはAIへ送信されません/],
  ["取扱説明書の「必須」とは何ですか？", "manual-notation", /入力しないと登録できない/],
  ["Rain Fieldでは何を管理できますか？", "overview-and-workflow", /案件、材料・仕入、見積単価、見積書、発注書/],
  ["材料・単価マスタでは何を管理しますか？", "screen-navigation", /材料・仕入一覧と見積単価マスタ/],
  ["売上や経費はどのメニューで確認しますか？", "screen-navigation", /「売上・利益管理」/],
  ["Rain Fieldを使い始める順番を教えて", "basic-workflow-steps", /1\. 「材料・単価マスタ」/],
  ["案件の登録方法はどうしますか？", "project-registration", /「＋ 新規案件」/],
  ["案件は顧客名や住所で検索できますか？", "project-search-and-status", /顧客名または住所の一部/],
  ["案件のステータスには何がありますか？", "project-search-and-status", /現調・提案中・見積提出・受注・失注・完了/],
  ["案件を削除したら関連書類は残りますか？", "project-deletion", /請求書、メール下書きも削除/],
  ["材料を手入力で登録する手順は？", "materials", /「材料・商品を手入力」/],
  ["材料登録で発注計算に必要な項目は？", "materials", /施工可能数量とロス率/],
  ["同じ仕入先の商品コードを重複登録できますか？", "materials", /重複登録できません/],
  ["CSVはShift-JISに対応していますか？", "material-import", /Shift-JISに対応/],
  ["CVSで今までの材料を取り込めますか？", "material-import", /対応形式は\.xlsxと\.csv/],
  ["一括取込の上限サイズと行数は？", "material-import", /50MBまで.*5,000行/],
  ["CSV取り込み後に入力が必要な項目は？", "material-import", /見積単位.*ロス率は取り込みません/],
  ["商品はどの項目から検索できますか？", "material-search-and-price-history", /JAN・バーコード/],
  ["仕入価格を変更する手順は？", "material-search-and-price-history", /価格適用日を変更/],
  ["仕入価格変更は保存済み見積書へ反映されますか？", "material-search-and-price-history", /保存済みの見積書は自動更新されません/],
  ["材料から見積単価を登録する手順は？", "estimate-price-master", /「この見積単価を登録」/],
  ["掛け率20%で原価100円なら見積単価はいくら？", "estimate-price-master", /見積単価は120円/],
  ["仕入単価9800円、100㎡、ロス5%の材料原価は？", "estimate-price-master", /102\.9円/],
  ["工数や外注費はどう登録しますか？", "labor-costs", /「見積単価を直接入力」/],
  ["30分の工数は数量いくつですか？", "labor-costs", /30分は0\.5/],
  ["見積書を作る具体的な手順は？", "estimates", /「見積を保存する」/],
  ["AI見積提案は単価を変更しますか？", "estimates", /AIは単価を変更しません/],
  ["自由入力の見積項目は発注に引き継がれますか？", "estimates", /発注書の自動計算には引き継がれません/],
  ["発注の必要量の計算式は？", "automatic-order-quantity", /必要量＝見積数量/],
  ["185㎡、1缶60㎡、ロス8%、2缶単位なら？", "automatic-order-quantity", /発注数4缶/],
  ["発注数が0になる原因は？", "automatic-order-quantity", /未入力・0の場合/],
  ["仕入先別発注書を作る手順は？", "purchase-orders", /仕入先タブで発注先を切り替え/],
  ["見積変更後に発注数を再計算するには？", "purchase-orders", /「見積書から再取込む」/],
  ["仕入先未設定だと発注書を印刷できますか？", "purchase-orders", /保存・印刷できません/],
  ["写真を登録する手順は？", "photos-reports-documents", /「写真を選択してアップロード」/],
  ["AI報告書を再生成すると前の内容は？", "photos-reports-documents", /前回内容を上書き/],
  ["近隣挨拶文は本番生成ですか？", "photos-reports-documents", /サンプル生成を含みます/],
  ["工程表はどのように作られますか？", "photos-reports-documents", /定番工程を自動配分/],
  ["写真は1案件何枚が目安ですか？", "photos-reports-documents", /1案件20枚/],
  ["請求書を作る具体的な手順は？", "invoices-sales-profit", /「請求書を保存する」/],
  ["月次売上は何を集計しますか？", "invoices-sales-profit", /請求書の税抜小計/],
  ["利益はどう計算されますか？", "invoices-sales-profit", /売上から経費を差し引いた利益/],
  ["顧客名と現場住所は必須ですと出ます", "errors", /顧客名と現場住所を入力して再登録/],
  ["ファイルは50MB以下にしてくださいと出ます", "errors", /ファイルを分割するか不要列を削除/],
  ["品目名と仕入単価の列対応が必要と出ます", "errors", /「品目名」「仕入単価」を設定/],
  ["AI生成の設定が完了していませんと出ます", "errors", /管理者へ設定状況を確認/],
  ["生成回数が上限と出たら？", "errors", /約10分待ってから再実行/],
  ["保存した案件が見つからない場合の確認順は？", "missing-saved-data-check", /1\. 登録時と同じパソコン/],
  ["ロス率とは何ですか？", "glossary-and-checklist", /こぼれ、重ね、残量/],
  ["注文できる数量単位とは何ですか？", "glossary-and-checklist", /注文数量の刻み/],
  ["再取り込みとは何ですか？", "glossary-and-checklist", /材料の必要量と仕入先別発注書を再計算/],
  ["初回設定で確認することは？", "glossary-and-checklist", /初回設定チェックリスト/],
  ["運用開始前の最終確認は？", "glossary-and-checklist", /仕入先の注文条件と一致/],
];

test("取扱説明書の全27ページに対応する知識を持つ", () => {
  const coveredPages = new Set(RAIN_FIELD_KNOWLEDGE.flatMap((chunk) => chunk.pages));
  assert.deepEqual([...coveredPages].sort((left, right) => left - right), Array.from({ length: 27 }, (_, index) => index + 1));
});

test("取扱説明書の全主要項目を質問から検索できる", () => {
  for (const [question, expectedId, expectedText] of manualCoverageCases) {
    const matches = retrieveRainFieldKnowledge(messages(question));
    const ids = matches.map((chunk) => chunk.id);
    const context = buildRainFieldContext(messages(question));

    assert.ok(ids.includes(expectedId), `${question}: expected ${expectedId}, got ${ids.join(", ") || "none"}`);
    assert.match(context, expectedText, `${question}: expected answer evidence was not retrieved`);
  }
});

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
  assert.ok(retrievedIds("案件を削除したら写真は残りますか？").includes("project-deletion"));
});

test("案件登録の質問には9ページの具体的な5手順を取得する", () => {
  const matches = retrieveRainFieldKnowledge(messages("案件の登録方法はどうしますか？"));
  const context = buildRainFieldContext(messages("案件の登録方法はどうしますか？"));

  assert.equal(matches[0]?.id, "project-registration");
  assert.match(context, /1\. 上部メニューの「案件一覧」を開きます/);
  assert.match(context, /2\. 画面右上の「＋ 新規案件」を押します/);
  assert.match(context, /顧客名と現場住所.*必須/);
  assert.match(context, /調査日、担当者、建物種別/);
  assert.match(context, /「登録する」を押します。登録後、案件詳細が開きます/);
  assert.match(context, /第4章・9ページ/);
});

test("CVSという入力ミスでも12〜13ページの材料一括取込を最優先で取得する", () => {
  for (const question of [
    "CVSで今までの材料を取り込めますか？",
    "ＣＶＳで既存材料を一括登録できますか？",
  ]) {
    const matches = retrieveRainFieldKnowledge(messages(question));
    const context = buildRainFieldContext(messages(question));

    assert.equal(matches[0]?.id, "material-import", `${question}: material-import should rank first`);
    assert.match(context, /対応形式は\.xlsxと\.csv/);
    assert.match(context, /50MBまで.*5,000行/);
    assert.match(context, /見積単位、1仕入単位で施工できる数量、ロス率は取り込みません/);
  }
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
  assert.match(instructions, /提示された「出典:」の章名・ページ表記を変更せず/);
  assert.match(instructions, /一般的にありそうという理由で追加しない/);
  assert.match(instructions, /必ずその内容から回答し、「記載がない」「確認が必要」とは答えない/);
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
  assert.doesNotMatch(instructions, /\n## 今回の質問に関連するRain Field知識/);
});
