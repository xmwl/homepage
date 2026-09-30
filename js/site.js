(function () {
  var current = location.pathname.replace(/index\.html$/, '').replace(/(.)\/$/, '$1') || '/';
  var links = document.querySelectorAll('.site-header a[href]');

  links.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.setAttribute('aria-current', 'page');
    }
  });

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    var icon = toggle.querySelector('.fa');
    var sync = function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      icon.className = 'fa ' + (isLight ? 'fa-moon-o' : 'fa-sun-o');
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };
    sync();
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  var gilly = document.querySelector('.gilly');
  if (gilly) {
    gilly.addEventListener('click', function () {
      gilly.classList.toggle('is-active');
    });
  }
})();
