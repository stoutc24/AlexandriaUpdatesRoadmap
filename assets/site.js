// Alexandria site: reveal-on-scroll, marquee, parallax, nav, lightbox, counters, Party Play readouts.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll.
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Marquee: double the track for a seamless loop.
  document.querySelectorAll('.marquee-track').forEach(function (t) { t.innerHTML += t.innerHTML; });

  // Gentle parallax on marked elements.
  var px = document.querySelectorAll('[data-parallax]');
  if (px.length && !reduced) {
    var ticking = false;
    var update = function () {
      var y = window.scrollY || window.pageYOffset;
      px.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        el.style.setProperty('--py', (y * parseFloat(el.getAttribute('data-parallax'))).toFixed(1) + 'px');
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // Mobile nav.
  var mb = document.querySelector('.menu-btn');
  var nl = document.querySelector('.nav-links');
  if (mb && nl) {
    mb.addEventListener('click', function () { nl.classList.toggle('open'); });
    nl.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nl.classList.remove('open'); }); });
  }

  // Lightbox for any image marked zoomable.
  var lb = document.getElementById('lightbox');
  var lbi = document.getElementById('lightbox-img');
  if (lb && lbi) {
    document.querySelectorAll('img.zoomable').forEach(function (img) {
      img.addEventListener('click', function () {
        lbi.src = img.getAttribute('data-full') || img.src;
        lbi.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // Counters.
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced || !('IntersectionObserver' in window)) { el.textContent = end + suffix; return; }
    var seen = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      seen.disconnect();
      var t0 = performance.now();
      var step = function (t) {
        var p = Math.min(1, (t - t0) / 1200);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    seen.observe(el);
  });

  // Party Play: the followers' drift readouts breathe a little.
  var drifts = document.querySelectorAll('[data-drift]');
  if (drifts.length && !reduced) {
    setInterval(function () {
      drifts.forEach(function (d) {
        var v = Math.round(Math.random() * 8 - 4);
        d.textContent = (v > 0 ? '+' : '') + v + ' ms';
      });
    }, 1700);
  }

  // Beams in the Party Play diagram: lay each one from its node to the clock.
  var layBeams = function () {
    var dg = document.querySelector('.diagram');
    if (!dg) return;
    var clock = dg.querySelector('.node.clock');
    if (!clock) return;
    var box = dg.getBoundingClientRect();
    var c = clock.getBoundingClientRect();
    var cx = c.left + c.width / 2 - box.left, cy = c.top + c.height / 2 - box.top;
    dg.querySelectorAll('.beam').forEach(function (b) {
      var from = dg.querySelector(b.getAttribute('data-from'));
      if (!from) return;
      var f = from.getBoundingClientRect();
      var fx = f.left + f.width / 2 - box.left, fy = f.top + f.height / 2 - box.top;
      var dx = cx - fx, dy = cy - fy;
      b.style.left = fx + 'px';
      b.style.top = fy + 'px';
      b.style.width = Math.sqrt(dx * dx + dy * dy) + 'px';
      b.style.transform = 'rotate(' + Math.atan2(dy, dx) * 180 / Math.PI + 'deg)';
    });
  };
  layBeams();
  window.addEventListener('resize', layBeams);
  window.addEventListener('load', layBeams);
})();
