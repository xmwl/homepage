(function () {
  var current = location.pathname.replace(/index\.html$/, '').replace(/(.)\/$/, '$1') || '/';
  var links = document.querySelectorAll('.site-header a[href]');

  links.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
