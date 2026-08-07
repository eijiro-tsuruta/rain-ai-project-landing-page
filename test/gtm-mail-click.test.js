import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const ROOT = new URL("../", import.meta.url);

async function htmlFiles(directory = ROOT) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = new URL(entry.name, directory);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== "tmp") return htmlFiles(new URL(`${entry.name}/`, directory));
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  }));
  return files.flat();
}

test("all site pages load the shared mail click tracker", async () => {
  const pages = (await htmlFiles()).filter((path) => !path.pathname.endsWith("google717249a4a0dd8e9c.html"));

  for (const page of pages) {
    const html = await readFile(page, "utf8");
    assert.match(html, /<script src="\/gtm-mail-click\.js" defer><\/script>/, page.pathname);
  }
});

test("all Rain AI mailto anchors have the GTM event attribute", async () => {
  for (const page of await htmlFiles()) {
    const html = await readFile(page, "utf8");
    const links = html.match(/<a\b[^>]*href="mailto:rainaiproject@gmail\.com[^>]*>/gi) || [];

    for (const link of links) assert.match(link, /data-gtm-event="mail_click"/i, `${page.pathname}: ${link}`);
  }

  const chatbot = await readFile(new URL("../chatbot.js", import.meta.url), "utf8");
  assert.match(chatbot, /link\.dataset\.gtmEvent\s*=\s*"mail_click"/);
});

test("mail clicks push link URL and page path to dataLayer", async () => {
  let clickListener;
  class FakeElement {
    constructor({ href = "", tracked = false } = {}) {
      this.href = href;
      this.tracked = tracked;
    }
    matches(selector) {
      return this.tracked && selector === '[data-gtm-event="mail_click"]';
    }
    closest(selector) {
      return this.matches(selector) ? this : null;
    }
  }
  const window = { location: { pathname: "/products/rain-bio" } };
  const document = { addEventListener: (name, listener) => { if (name === "click") clickListener = listener; } };
  const source = await readFile(new URL("../gtm-mail-click.js", import.meta.url), "utf8");
  vm.runInNewContext(source, { document, Element: FakeElement, window });

  const link = new FakeElement({ href: "mailto:rainaiproject@gmail.com?subject=Rain%20BIO", tracked: true });
  clickListener({ composedPath: () => [new FakeElement(), link], target: link });

  assert.deepEqual(JSON.parse(JSON.stringify(window.dataLayer)), [{
    event: "mail_click",
    link_url: "mailto:rainaiproject@gmail.com?subject=Rain%20BIO",
    page_path: "/products/rain-bio",
  }]);
});
