import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const LP_URL = new URL("../products/rain-bio-mini.html", import.meta.url);

test("Bio mini LP loads the shared GTM container without a duplicate direct GA4 tag", async () => {
  const html = await readFile(LP_URL, "utf8");

  assert.match(html, /GTM-WDLLF5G3/);
  assert.match(html, /googletagmanager\.com\/ns\.html\?id=GTM-WDLLF5G3/);
  assert.doesNotMatch(html, /googletagmanager\.com\/gtag\/js\?id=G-1SSYELCJ35/);
});

test("Bio mini LP exposes product-specific advertising events", async () => {
  const html = await readFile(LP_URL, "utf8");

  assert.match(html, /event:'bio_mini_lp_view'/);
  assert.equal((html.match(/data-rain-chat-event="bio_mini_chat_open"/g) || []).length, 3);
  assert.equal((html.match(/data-rain-chat-product="rain_bio_mini"/g) || []).length, 3);
  assert.match(html, /data-gtm-event="mail_click" data-gtm-product="rain_bio_mini"/);

  const chatbot = await readFile(new URL("../chatbot.js", import.meta.url), "utf8");
  assert.match(chatbot, /data-rain-chat-event/);
  assert.match(chatbot, /data-rain-chat-product/);
});

test("Bio mini LP has its canonical public URL and shared site scripts", async () => {
  const html = await readFile(LP_URL, "utf8");

  assert.match(html, /rel="canonical" href="https:\/\/www\.rainaiproject\.com\/products\/rain-bio-mini"/);
  assert.match(html, /<script src="\/gtm-mail-click\.js" defer><\/script>/);
  assert.match(html, /<script src="\/chatbot\.js\?v=20260816-3" defer><\/script>/);
});
