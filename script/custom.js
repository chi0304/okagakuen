(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 1) Header fixed on scroll (rAF throttle)
  const header = $("header");
  let ticking = false;

  const updateHeader = () => {
    ticking = false;
    if (!header) return;
    header.classList.toggle("fixed", window.scrollY > 0);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeader);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", updateHeader);

  document.addEventListener("DOMContentLoaded", () => {
    // 2) Remove loading overlay
    const loading = $("#loading");
    if (loading) loading.remove();
    document.body.classList.add("show");

    // 3) Lazy-load images (skip above-the-fold)
    $$("img").forEach((img) => {
      const isAboveFold = img.closest("header") || img.closest("#page-header");
      if (!isAboveFold && !img.loading) img.loading = "lazy";
      if (!img.decoding) img.decoding = "async";
    });

    // 4) Mobile menu toggle
    const btn = $("#mobile-menu-btn");
    const panel = $("#mobile-menu");

    if (btn && panel) {
      const open = () => {
        panel.classList.remove("hidden");
        btn.setAttribute("aria-expanded", "true");
      };
      const close = () => {
        panel.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
      };
      const toggle = () => (panel.classList.contains("hidden") ? open() : close());

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggle();
      });

      // Close when click any link inside menu (hash or normal link)
      panel.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a) close();
      });

      // Close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });

      // Close when switching to desktop breakpoint (match your CSS: lg = 1024px)
      const mq = window.matchMedia("(min-width: 1024px)");
      const onMQ = () => {
        if (mq.matches) close();
      };
      mq.addEventListener?.("change", onMQ);
      onMQ();
    }

    // 5) Back to top
    const backToTop = $("#backToTop");
    if (backToTop) {
      const toggleBackToTop = () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
      };
      window.addEventListener("scroll", () => requestAnimationFrame(toggleBackToTop), { passive: true });
      toggleBackToTop();

      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
