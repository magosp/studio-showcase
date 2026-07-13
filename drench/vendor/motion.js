(function(){
  var __mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (__mq && __mq.matches) { return; }   // a11y FIRST: reduce -> no motion, page stays at final static state
  if (typeof gsap === 'undefined') { return; }   // fail-safe: no GSAP -> static, fully-readable page
  try {
    if (typeof ScrollTrigger !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
    document.querySelectorAll('[data-motion~="reveal"]').forEach(function(el){
      gsap.from(el, {opacity:0, y:28, duration:0.7, ease:'power2.out',
        scrollTrigger:{trigger:el, start:'top 88%', once:true}});
    });
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="scrub"]').forEach(function(el){
        var v = el.matches('video') ? el : el.querySelector('video');
        if (!v) { return; }   // fail-safe: no video -> nothing to scrub (any poster stays)
        var span = parseFloat(el.getAttribute('data-scrub-span')) || 150;
        function wire(){
          try { v.pause(); } catch(_){}   // the scrub owns the playhead; never autoplay here
          ScrollTrigger.create({trigger:el, start:'top top', end:'+='+span+'%', pin:true,
            pinSpacing:true, scrub:true,
            onUpdate:function(self){ if (v.duration) { v.currentTime = self.progress * v.duration; } }});
        }
        if (v.readyState >= 1 && v.duration) { wire(); }
        else { v.addEventListener('loadedmetadata', wire, {once:true}); }
      });
    }
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="parallax"]').forEach(function(el){
        var depth = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        gsap.to(el, {yPercent: -18 * depth, ease:'none',
          scrollTrigger:{trigger:el, start:'top bottom', end:'bottom top', scrub:true}});
      });
    }
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-motion~="pin"]').forEach(function(el){
        ScrollTrigger.create({trigger:el, start:'top top', end:'+=80%', pin:true, pinSpacing:true});
      });
    }
  } catch (e) {
    // any failure -> the page is already at its readable final state (we only animate FROM hidden,
    // never hide via CSS); swallow so a motion bug can never blank or freeze the page.
  }
})();
