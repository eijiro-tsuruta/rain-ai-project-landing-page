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
