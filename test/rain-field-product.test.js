import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../products/rain-field.html", import.meta.url), "utf8");

test("Rain Field LPに初期費用・月額・無料体験を明示する", () => {
  assert.match(page, /初期費用なし。/);
  assert.match(page, /初期費用<\/span><strong>0円<\/strong>/);
  assert.match(page, /月額<\/small><strong>9,800<\/strong><span>円（税込）<\/span>/);
  assert.match(page, /14日間無料/);
  assert.match(page, /体験中の請求0円/);
});

test("料金ページへの導線と利用条件を表示する", () => {
  assert.match(page, /href="https:\/\/rainfield\.rainaiproject\.com\/subscription"/);
  assert.match(page, /data-rain-field-action="open-pricing"/);
  assert.match(page, /無料体験の開始時にカード登録が必要/);
  assert.match(page, /終了後に月額料金が自動請求/);
});

test("構造化データにもRain Fieldの公開料金を掲載する", () => {
  assert.match(page, /"@type":"Offer"/);
  assert.match(page, /"price":"9800"/);
  assert.match(page, /"priceCurrency":"JPY"/);
  assert.match(page, /"description":"初期費用0円。月額9,800円（税込）、14日間無料。"/);
});
