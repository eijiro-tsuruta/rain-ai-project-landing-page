(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const dialog = document.querySelector('#booking-dialog');
  const form = document.querySelector('#booking-form');
  const preview = document.querySelector('#booking-preview');
  const course = document.querySelector('#booking-course');
  const size = document.querySelector('#booking-size');

  function closeMenu() {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
  }

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.querySelectorAll('[data-booking]').forEach(button => {
    button.addEventListener('click', () => {
      form.reset();
      preview.hidden = true;
      course.value = button.dataset.booking || 'まずは相談したい';
      closeMenu();
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#preview-copy').textContent = `${size.value} ／ ${course.value}`;
    preview.hidden = false;
    preview.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  });
  form.addEventListener('change', () => { preview.hidden = true; });
})();
