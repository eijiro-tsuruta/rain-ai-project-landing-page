import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const INDEX_URL = new URL("../index.html", import.meta.url);

test("トップページのプロダクト一覧からLINE見積へ移動できる", async () => {
  const html = await readFile(INDEX_URL, "utf8");

  assert.match(html, /href="https:\/\/estimate\.rainaiproject\.com\/"/);
  assert.match(html, />LINE見積 ↗<\/a>/);
  assert.match(html, /月額9,800円を予定し、現在はテスト期間として無料開放/);
  assert.match(html, /"url": "https:\/\/estimate\.rainaiproject\.com\/"/);
});
