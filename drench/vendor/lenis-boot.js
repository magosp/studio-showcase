(function(){
  window.__lenis = null;
  var __mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (__mq && __mq.matches) { return; }   // a11y: reduced-motion -> do NOT hijack; native scroll stays
  if (typeof Lenis === 'undefined') { return; }   // fail-safe: lib missing -> native scroll
  try {
    var l = new Lenis({"duration": 1.1, "smoothWheel": true});
    window.__lenis = l;
    function __raf(t){ if (window.__lenis) { l.raf(t); requestAnimationFrame(__raf); } }
    requestAnimationFrame(__raf);
    if (window.ScrollTrigger && window.gsap) { l.on('scroll', function(){ window.ScrollTrigger.update(); }); }
    if (__mq && __mq.addEventListener) { __mq.addEventListener('change', function(e){
      if (e.matches && window.__lenis) { try { window.__lenis.destroy(); } catch (_) {} window.__lenis = null; }
    }); }
  } catch (e) {
    if (window.__lenis) { try { window.__lenis.destroy(); } catch (_) {} }
    window.__lenis = null;   // any failure -> degrade to native scroll, never break the page
  }
})();
