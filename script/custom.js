(() => {
  "use strict";

  const header = document.querySelector("header");
  const updateHeader = () => {
    if (header) header.classList.toggle("fixed", window.pageYOffset > 0);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("load", updateHeader);

  document.addEventListener("DOMContentLoaded", () => {
    const ld = document.getElementById("loading");
    if (ld) ld.remove();
    document.body.classList.add("show");

    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("loading")) img.loading = "lazy";
      if (!img.hasAttribute("decoding")) img.decoding = "async";
      img.style.maxWidth = img.style.maxWidth || "100%";
      img.style.height = img.style.height || "auto";
      img.style.display = img.style.display || "block";
    });

    document.querySelectorAll(".scroll-wrap").forEach((el) => {
      const mark = () => el.classList.add("touched");
      el.addEventListener("scroll", mark, { passive: true });
      el.addEventListener("touchstart", mark, { passive: true });
    });

    if (window.Swiper && document.querySelector("#drawer-slider")) {
      new Swiper("#drawer-slider", {
        loop: true,
        effect: "fade",
        autoplay: { delay: 3000 },
        speed: 1000,
        allowTouchMove: false,
      });
    }
    if (window.LuminousGallery) {
      const triggers = document.querySelectorAll(".luminous");
      if (triggers.length) new LuminousGallery(triggers, {}, {});
    }
  });
})();
