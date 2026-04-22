/* ============================================
   MAIN — Navigation, Scroll, Hamburger Menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  const navLinks = document.querySelectorAll('.nav__link');

  // ============ SCROLLED NAV ============
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav--scrolled', scrollY > 50);
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ============ ACTIVE NAV LINK ============
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ============ HAMBURGER MENU ============
  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('mobile-menu--active');
    hamburger.classList.toggle('hamburger--active', !isOpen);
    mobileMenu.classList.toggle('mobile-menu--active', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('hamburger--active');
    mobileMenu.classList.remove('mobile-menu--active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============ FORM HANDLING ============
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          btn.textContent = '✓';
          btn.style.background = 'var(--teal)';
          form.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        btn.textContent = 'Error';
        btn.style.background = '#e74c3c';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

});