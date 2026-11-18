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
