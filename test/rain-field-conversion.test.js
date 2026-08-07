import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

test("Rain Field page loads the Google Ads conversion tracker", async () => {
  const html = await readFile(new URL("../products/rain-field.html", import.meta.url), "utf8");
  assert.match(html, /<script src="\/rain-field-conversion\.js" defer><\/script>/);
  assert.equal((html.match(/data-rain-field-action="open-app"/g) || []).length, 2);
});

test("opening Rain Field sends the dataLayer event and Google Ads conversion", async () => {
  let clickListener;
  class FakeElement {
    constructor({ href = "", tracked = false } = {}) {
      this.href = href;
      this.tracked = tracked;
    }
    matches(selector) {
      return this.tracked && selector === '[data-rain-field-action="open-app"]';
    }
    closest(selector) {
      return this.matches(selector) ? this : null;
    }
  }

  const window = { location: { pathname: "/products/rain-field" } };
  const document = { addEventListener: (name, listener) => { if (name === "click") clickListener = listener; } };
  const source = await readFile(new URL("../rain-field-conversion.js", import.meta.url), "utf8");
  vm.runInNewContext(source, { document, Element: FakeElement, window });

  const link = new FakeElement({ href: "https://rainfield.rainaiproject.com/", tracked: true });
  clickListener({ composedPath: () => [link], target: link });

  const plainEvent = JSON.parse(JSON.stringify(window.dataLayer[0]));
  assert.deepEqual(plainEvent, {
    event: "rain_field_open_click",
    link_url: "https://rainfield.rainaiproject.com/",
    page_path: "/products/rain-field",
  });
  assert.equal(window.dataLayer[1][0], "event");
  assert.equal(window.dataLayer[1][1], "conversion");
  assert.equal(window.dataLayer[1][2].send_to, "AW-822511088/OC6bCKujoNwcEPCLmogD");
});
