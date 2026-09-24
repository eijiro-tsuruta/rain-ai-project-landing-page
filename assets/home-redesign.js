(() => {
  const header = document.querySelector("[data-site-header]");
  const button = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-site-nav]");

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  button?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open") ?? false;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });

  nav?.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    nav.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
    button?.setAttribute("aria-label", "メニューを開く");
  });
})();
