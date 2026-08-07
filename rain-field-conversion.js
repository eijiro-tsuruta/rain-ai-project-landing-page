(() => {
  const OPEN_APP_SELECTOR = '[data-rain-field-action="open-app"]';
  const CONVERSION_DESTINATION = "AW-822511088/OC6bCKujoNwcEPCLmogD";

  document.addEventListener("click", (event) => {
    const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
    const link = eventPath.find((node) => node instanceof Element && node.matches(OPEN_APP_SELECTOR))
      || (event.target instanceof Element ? event.target.closest(OPEN_APP_SELECTOR) : null);

    if (!link) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "rain_field_open_click",
      link_url: link.href,
      page_path: window.location.pathname,
    });

    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("event", "conversion", {
      send_to: CONVERSION_DESTINATION,
    });
  });
})();
