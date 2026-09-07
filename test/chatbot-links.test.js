import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("チャット回答内のHTTP/HTTPS URLだけを安全なリンクとして表示する", async () => {
  const source = await readFile(new URL("../chatbot.js", import.meta.url), "utf8");

  assert.match(source, /const pattern = \/https\?:\\\/\\\/\[\^\\s<>"'\]\+\/g/);
  assert.match(source, /document\.createElement\("a"\)/);
  assert.match(source, /link\.target = "_blank"/);
  assert.match(source, /link\.rel = "noopener noreferrer"/);
  assert.match(source, /appendLinkedText\(bubble, displayText\(role, text\)\)/);
  assert.doesNotMatch(source, /bubble\.innerHTML = displayText/);
});

test("トップページでは未拒否のBotを自動展開し、閉じた選択を保存する", async () => {
  const source = await readFile(new URL("../chatbot.js", import.meta.url), "utf8");

  assert.match(source, /const isTopPage = \/\^\\\/\(\?:index\\\.html\)\?\$\//);
  assert.match(source, /localStorage\.getItem\(autoOpenDismissedKey\)/);
  assert.match(source, /localStorage\.setItem\(autoOpenDismissedKey, "1"\)/);
  assert.match(source, /if \(isTopPage && !autoOpenWasDismissed\(\)\)/);
  assert.match(source, /setOpen\(true, \{ focus: false \}\)/);
  assert.match(source, /rain_chat_auto_open/);
});

test("全ページが同じ更新版のチャットBotを読み込む", async () => {
  const pages = [
    "index.html",
    "lp-production.html",
    "blog.html",
    "kumamoto-ai-guide.html",
    "kumamoto-ai-diagnosis.html",
    "blog/kumamoto-ai-2026.html",
    "blog/line-yoyaku-bot-failure.html",
    "blog/lp-production-ai-era.html",
    "blog/rain-field-construction-office.html",
    "products/ai-chatbot.html",
    "products/ai-senden.html",
    "products/ai-senden-guide.html",
    "products/line-reservation-bot.html",
    "products/rain-bio.html",
    "products/rain-bio-mini.html",
    "products/rain-discovery.html",
    "products/rain-field.html",
  ];

  for (const page of pages) {
    const source = await readFile(new URL(`../${page}`, import.meta.url), "utf8");
    assert.match(
      source,
      /<script src="\/chatbot\.js\?v=20260907-1" defer><\/script>/,
      `${page} must load the current chatbot asset`,
    );
    assert.doesNotMatch(source, /src="\/chatbot\.js"/);
  }
});
