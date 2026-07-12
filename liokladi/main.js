
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  
  var header = document.querySelector("[data-header]");
  var hero = document.querySelector(".hero");
  function onScroll() {
    var past = hero ? window.scrollY > hero.offsetHeight - 80 : window.scrollY > 400;
    if (header) header.classList.toggle("is-scrolled", past);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  
  var form = document.querySelector("[data-form]");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var note = form.querySelector("[data-form-note]");
    var email = (form.querySelector('input[name="email"]') || {}).value || "";
    if (note) note.textContent = email
      ? "Thank you — we'll write when this year's first press opens."
      : "Add an email and we'll write when the first press opens.";
  });

  
  var vid = document.querySelector("[data-hero-video]");
  if (vid && reduce) { try { vid.removeAttribute("autoplay"); vid.pause(); } catch (e) {} }

  
  if (!reduce && window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.to("[data-rise]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.1 });
    document.querySelectorAll(".section").forEach(function (sec) {
      var rises = sec.querySelectorAll(".eyebrow, h2");
      if (rises.length && window.ScrollTrigger) gsap.from(rises, {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 80%" }
      });
    });
    document.querySelectorAll("[data-wipe] img").forEach(function (img) {
      if (window.ScrollTrigger) gsap.to(img, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: img, start: "top 82%" } });
    });
    if (window.ScrollTrigger) gsap.to("[data-stagger]", {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
      scrollTrigger: { trigger: ".notes", start: "top 82%" }
    });
  } else {

    document.querySelectorAll("[data-rise],[data-stagger]").forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
    document.querySelectorAll("[data-wipe] img").forEach(function (img) { img.style.clipPath = "none"; });
  }
})();
