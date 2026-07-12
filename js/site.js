(function () {
  var current = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.site-header a[href]');

  links.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
