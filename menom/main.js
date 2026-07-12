


(function(){
  window.__lenis = null;
  var __mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (__mq && __mq.matches) { return; }
  if (typeof Lenis === 'undefined') { return; }
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
    window.__lenis = null;
  }
})();


(function(){
  var __mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (__mq && __mq.matches) { return; }
  if (typeof gsap === 'undefined') { return; }
  try {
    if (typeof ScrollTrigger !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
    document.querySelectorAll('[data-motion~="reveal"]').forEach(function(el){
      gsap.from(el, {opacity:0, y:28, duration:0.7, ease:'power2.out',
        scrollTrigger:{trigger:el, start:'top 88%', once:true}});
    });
    if (typeof SplitText !== 'undefined') {
      document.querySelectorAll('[data-motion~="split"]').forEach(function(el){
        try {
          var sp = new SplitText(el, {type:'chars,words'});
          gsap.from(sp.chars, {opacity:0, yPercent:120, stagger:0.02, duration:0.6, ease:'power3.out',
            scrollTrigger:{trigger:el, start:'top 90%', once:true}});
        } catch (_) {  }
      });
    }
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="pin"]').forEach(function(el){
        ScrollTrigger.create({trigger:el, start:'top top', end:'+=80%', pin:true, pinSpacing:true});
      });
    }
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="parallax"]').forEach(function(el){
        var depth = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        gsap.to(el, {yPercent: -18 * depth, ease:'none',
          scrollTrigger:{trigger:el, start:'top bottom', end:'bottom top', scrub:true}});
      });
    }
    document.querySelectorAll('[data-motion~="scrim"]').forEach(function(el){
      gsap.from(el, {filter:'brightness(0)', duration:1.0, ease:'power1.out',
        scrollTrigger:{trigger:el, start:'top 80%', once:true}});
    });
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="scrub"]').forEach(function(el){
        var v = el.matches('video') ? el : el.querySelector('video');
        if (!v) { return; }
        var span = parseFloat(el.getAttribute('data-scrub-span')) || 150;
        function wire(){
          try { v.pause(); } catch(_){}
          ScrollTrigger.create({trigger:el, start:'top top', end:'+='+span+'%', pin:true,
            pinSpacing:true, scrub:true,
            onUpdate:function(self){ if (v.duration) { v.currentTime = self.progress * v.duration; } }});
        }
        if (v.readyState >= 1 && v.duration) { wire(); }
        else { v.addEventListener('loadedmetadata', wire, {once:true}); }
      });
    }
  } catch (e) {


  }
})();


(function(){
  "use strict";
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');




  var header = document.querySelector('[data-header]');
  var hero = document.querySelector('.hero');
  if (header && hero) {
    function onScroll(){
      var threshold = Math.max(0, hero.offsetHeight - header.offsetHeight - 8);
      if (window.scrollY > threshold) { header.classList.add('is-solid'); }
      else { header.classList.remove('is-solid'); }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
  }


  function honorReducedMotion(){
    if (!(RM && RM.matches)) return;
    document.querySelectorAll('video[autoplay]').forEach(function(v){
      try { v.removeAttribute('autoplay'); v.pause(); } catch(_){}
    });
  }
  honorReducedMotion();
  if (RM && RM.addEventListener) { RM.addEventListener('change', honorReducedMotion); }



  var btn = document.querySelector('[data-play]');
  if (btn) {
    btn.addEventListener('click', function(){
      var plate = btn.closest('.trailer-plate');
      if (!plate || plate.querySelector('video')) return;
      var v = document.createElement('video');
      v.src = './assets/hero.mp4'; v.muted = true; v.loop = true; v.playsInline = true; v.controls = true;
      v.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:3');
      plate.appendChild(v);
      var img = plate.querySelector('img'); if (img) img.setAttribute('hidden', '');
      btn.setAttribute('hidden', '');
      try { v.play(); } catch(_){}
    });
  }


  var cta = document.querySelector('[data-cta]');
  if (cta) {
    cta.addEventListener('click', function(e){ e.preventDefault(); cta.textContent = 'On sale October 1'; });
  }
})();
