(() => {
  "use strict";

  const onLoad = () => {
    const header = document.querySelector("header");
    if (header) header.classList.toggle("fixed", window.pageYOffset > 0);
  };
  window.addEventListener("scroll", onLoad, { passive: true });
  window.addEventListener("load", onLoad);

  document.addEventListener("DOMContentLoaded", () => {
    // Remove loading
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
    document.body.classList.add("show");

    // Lazy loading images
    document.querySelectorAll("img").forEach((img) => {
      const isAboveFold = img.closest("header") || img.closest("#page-header");
      if (!isAboveFold && !img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
      if (!img.hasAttribute("decoding")) {
        img.setAttribute("decoding", "async");
      }
      img.style.maxWidth = img.style.maxWidth || "100%";
      img.style.height = img.style.height || "auto";
      img.style.display = img.style.display || "block";
    });

    // scroll-wrap touch detect
    document.querySelectorAll(".scroll-wrap").forEach((el) => {
      const mark = () => el.classList.add("touched");
      el.addEventListener("scroll", mark, { passive: true });
      el.addEventListener("touchstart", mark, { passive: true });
    });

    // Swiper
    if (window.Swiper && document.querySelector("#drawer-slider")) {
      new Swiper("#drawer-slider", {
        loop: true,
        effect: "fade",
        autoplay: { delay: 3000 },
        speed: 1000,
        allowTouchMove: false,
      });
    }

    // Luminous
    if (window.LuminousGallery) {
      const triggers = document.querySelectorAll(".luminous");
      if (triggers.length) {
        new LuminousGallery(triggers, {}, {});
      }
    }

    // Back to top
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
      });

      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
