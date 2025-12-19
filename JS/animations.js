document.addEventListener('DOMContentLoaded', function () {
  function createIframe(src) {
    var ifr = document.createElement('iframe');
    ifr.setAttribute('width', '100%');
    ifr.setAttribute('height', '240');
    ifr.setAttribute('style', 'border:0;border-radius:8px;');
    ifr.setAttribute('loading', 'lazy');
    ifr.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    ifr.src = src;
    return ifr;
  }

  document.querySelectorAll('.map-placeholder').forEach(function (pl) {
    var src = pl.dataset.src;
    if (!src) return;
    // create a button to load the iframe
    var btn = pl.querySelector('.map-load-btn, .load-map-btn');
    var auto = pl.dataset.autoload === 'true';

    function loadMap() {
      if (pl.classList.contains('map-loaded')) return;
      var frame = createIframe(src);
      pl.innerHTML = '';
      pl.appendChild(frame);
      pl.classList.add('map-loaded');
    }

    if (auto) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            loadMap();
            obs.disconnect();
          }
        });
      }, {rootMargin: '200px'});
      obs.observe(pl);
    }

    if (btn) btn.addEventListener('click', loadMap);
  });

  var counters = document.querySelectorAll('.fact-number');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = parseFloat(el.textContent.replace(/[^0-9\.]/g, '')) || 0;
        if (el.dataset.animated) return;
        el.dataset.animated = '1';
        var start = 0;
        var duration = 900; // ms
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var value = Math.floor(progress * end);
          el.textContent = value + (isNaN(end) ? '' : '');
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, {threshold: 0.5});
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-green').forEach(function (b) {
    b.addEventListener('mousedown', function () { b.classList.add('pressed'); });
    b.addEventListener('mouseup', function () { b.classList.remove('pressed'); });
    b.addEventListener('mouseleave', function () { b.classList.remove('pressed'); });
  });
});


