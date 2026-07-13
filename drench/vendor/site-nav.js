(function(){
  var h=document.querySelector('[data-cl-nav]'); if(!h) return;
  var sel=h.getAttribute('data-solid-after'); var anchor=sel?document.querySelector(sel):null;
  function onScroll(){ var t=anchor?Math.max(0,anchor.offsetHeight-h.offsetHeight-8):8;
    if(window.scrollY>t){h.classList.add('is-solid');}else{h.classList.remove('is-solid');} }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll);
})();
