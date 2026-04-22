/* ============================================
   SCROLL ANIMATIONS & COUNTERS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ INTERSECTION OBSERVER — Scroll Reveals ============
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Don't unobserve — keeps re-triggering disabled for perf
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale-in').forEach(el => {
    revealObserver.observe(el);
  });

  // ============ ANIMATED COUNTERS ============
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ============ BOOK FILTER ============
  const bookPills = document.querySelectorAll('.books__filters .filter-pill');
  const bookCards = document.querySelectorAll('.book-card');

  bookPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      bookPills.forEach(p => p.classList.remove('filter-pill--active'));
      pill.classList.add('filter-pill--active');
      bookCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('book-card--hidden');
        } else {
          card.classList.add('book-card--hidden');
        }
      });
    });
  });

  // ============ PROJECT FILTER ============
  const projectPills = document.querySelectorAll('.projects__filters .filter-pill');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  projectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.pfilter;
      projectPills.forEach(p => p.classList.remove('filter-pill--active'));
      pill.classList.add('filter-pill--active');
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('project-card--hidden');
        } else {
          card.classList.add('project-card--hidden');
        }
      });
    });
  });

  // ============ STAGGER CHILDREN — Auto add delays ============
  document.querySelectorAll('.projects-grid, .education-grid, .skills-grid').forEach(grid => {
    const children = grid.querySelectorAll('.anim-fade-up');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

});