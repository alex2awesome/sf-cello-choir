// Click-to-load YouTube embeds: the page shows the video's own thumbnail and
// only talks to YouTube once someone presses play.
document.querySelectorAll('.yt').forEach(function (fig) {
  var button = fig.querySelector('.yt-play');
  if (!button) { return; }
  button.addEventListener('click', function () {
    var id = fig.getAttribute('data-id');
    var frame = document.createElement('div');
    frame.className = 'yt-frame';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = fig.getAttribute('data-title') || 'Video';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    frame.appendChild(iframe);
    button.replaceWith(frame);
  });
});

// Hero carousel: crossfade every few seconds, pause on hover or focus, arrows, dots and swipe.
document.querySelectorAll('.carousel').forEach(function (root) {
  var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
  var dots = root.querySelector('.carousel-dots');
  if (slides.length < 2 || !dots) { return; }
  var index = 0, timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var interval = parseInt(root.getAttribute('data-interval'), 10) || 5000;
  slides.forEach(function (slide, n) {
    var dot = document.createElement('button');
    dot.type = 'button'; dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Picture ' + (n + 1) + ' of ' + slides.length);
    dot.setAttribute('aria-selected', n === 0 ? 'true' : 'false');
    dot.addEventListener('click', function () { show(n); restart(); });
    dots.appendChild(dot);
  });
  function show(n) {
    slides[index].classList.remove('is-active');
    dots.children[index].setAttribute('aria-selected', 'false');
    index = (n + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dots.children[index].setAttribute('aria-selected', 'true');
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() { if (reduceMotion || timer) { return; } timer = setInterval(function () { show(index + 1); }, interval); }
  function restart() { stop(); start(); }
  root.querySelector('.prev').addEventListener('click', function () { show(index - 1); restart(); });
  root.querySelector('.next').addEventListener('click', function () { show(index + 1); restart(); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', function () { if (document.hidden) { stop(); } else { start(); } });
  var touchX = null;
  root.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (touchX === null) { return; }
    var dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 40) { show(dx < 0 ? index + 1 : index - 1); restart(); }
  });
  start();
});
