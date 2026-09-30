(function () {
  var shots = document.querySelectorAll('.work-shot img');
  if (!shots.length) return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Image preview');
  dialog.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close preview">' +
      '<i class="fa fa-times" aria-hidden="true"></i>' +
    '</button>' +
    '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous image">' +
      '<i class="fa fa-chevron-left" aria-hidden="true"></i>' +
    '</button>' +
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="">' +
      '<figcaption class="lightbox-caption"></figcaption>' +
      '<span class="lightbox-count" aria-live="polite"></span>' +
    '</figure>' +
    '<button class="lightbox-nav lightbox-next" type="button" aria-label="Next image">' +
      '<i class="fa fa-chevron-right" aria-hidden="true"></i>' +
    '</button>';
  document.body.appendChild(dialog);

  var dialogImg = dialog.querySelector('.lightbox-img');
  var dialogCaption = dialog.querySelector('.lightbox-caption');
  var dialogCount = dialog.querySelector('.lightbox-count');
  var prevButton = dialog.querySelector('.lightbox-prev');
  var nextButton = dialog.querySelector('.lightbox-next');
  var current = 0;

  function show(index) {
    current = (index + shots.length) % shots.length;
    var img = shots[current];
    var caption = img.closest('figure').querySelector('figcaption');
    dialogImg.src = img.currentSrc || img.src;
    dialogImg.alt = img.alt;
    dialogCaption.textContent = caption ? caption.textContent : '';
    dialogCaption.hidden = !caption;
    dialogCount.textContent = (current + 1) + ' / ' + shots.length;
  }

  function open(index) {
    show(index);
    dialog.showModal();
    document.documentElement.classList.add('lightbox-open');
  }

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('lightbox-open');
    dialogImg.removeAttribute('src');
  });

  prevButton.addEventListener('click', function () { show(current - 1); });
  nextButton.addEventListener('click', function () { show(current + 1); });

  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(current - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      show(current + 1);
    }
  });

  // Clicking anywhere outside the image and arrows (backdrop, padding, close button) closes it
  dialog.addEventListener('click', function (e) {
    if (e.target === dialogImg || e.target.closest('.lightbox-nav')) return;
    dialog.close();
  });

  Array.prototype.forEach.call(shots, function (img, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'work-shot-zoom';
    button.setAttribute('aria-label', 'View larger: ' + img.alt);
    img.parentNode.insertBefore(button, img);
    button.appendChild(img);
    button.addEventListener('click', function () { open(index); });
  });
})();
