(() => {
  const MAIL_CLICK_SELECTOR = '[data-gtm-event="mail_click"]';

  document.addEventListener("click", (event) => {
    const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
    const link = eventPath.find((node) => node instanceof Element && node.matches(MAIL_CLICK_SELECTOR))
      || (event.target instanceof Element ? event.target.closest(MAIL_CLICK_SELECTOR) : null);

    if (!link) return;

    window.dataLayer = window.dataLayer || [];
    const payload = {
      event: "mail_click",
      link_url: link.href,
      page_path: window.location.pathname,
    };
    const product = link.dataset?.gtmProduct || "";
    if (product) payload.product = product;
    window.dataLayer.push(payload);
  });
})();
