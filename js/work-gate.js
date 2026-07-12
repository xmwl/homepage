(function () {
  var PASSWORD = 'password';
  var STORAGE_KEY = 'work-unlocked';

  var gate = document.getElementById('work-gate');
  var content = document.getElementById('work-content');
  var form = document.getElementById('work-gate-form');
  var input = document.getElementById('work-gate-password');
  var error = document.getElementById('work-gate-error');

  function unlock() {
    gate.hidden = true;
    content.hidden = false;
  }

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    unlock();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (input.value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      error.textContent = '';
      unlock();
    } else {
      error.textContent = 'Incorrect password.';
      input.value = '';
      input.focus();
    }
  });
})();
