import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const globalHeaders = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key.toLowerCase(), value]));

test("all routes receive the core security headers", () => {
  assert.equal(config.headers[0].source, "/(.*)");
  assert.equal(globalHeaders["x-content-type-options"], "nosniff");
  assert.equal(globalHeaders["x-frame-options"], "DENY");
  assert.equal(globalHeaders["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(globalHeaders["strict-transport-security"], /max-age=31536000/);
});

test("CSP limits active content while allowing current site dependencies", () => {
  const csp = globalHeaders["content-security-policy"];
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.match(csp, /font-src 'self' https:\/\/fonts\.gstatic\.com/);
  assert.match(csp, /https:\/\/www\.googleadservices\.com/);
  assert.match(csp, /https:\/\/googleads\.g\.doubleclick\.net/);
  assert.match(csp, /form-action 'self'/);
  assert.match(csp, /upgrade-insecure-requests/);
});
