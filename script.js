/* =========================================================
   KALICHARAN MURMU — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. MOBILE NAVIGATION TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');
  const navLinksWrap = document.getElementById('navLinks');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after clicking a link (mobile)
    navLinksWrap.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. NAVBAR STYLE ON SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------- 3. ACTIVE NAV LINK BASED ON SECTION ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ---------- 4. SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // No IntersectionObserver support or reduced motion preferred: show everything immediately
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- 5. TYPING ANIMATION IN HERO ---------- */
  const typedRole = document.getElementById('typedRole');
  const roles = ['Student', 'Developer', 'Learner', 'Future Entrepreneur'];

  if (typedRole && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    const TYPE_SPEED = 90;
    const DELETE_SPEED = 45;
    const HOLD_TIME = 1400;

    const typeLoop = () => {
      const currentWord = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > currentWord.length) {
          typedRole.textContent = currentWord;
          deleting = true;
          setTimeout(typeLoop, HOLD_TIME);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          charIndex = 0;
        }
      }

      typedRole.textContent = currentWord.slice(0, charIndex);
      setTimeout(typeLoop, deleting ? DELETE_SPEED : TYPE_SPEED);
    };

    // Start the loop after the initial hold on "Student"
    charIndex = roles[0].length;
    deleting = true;
    setTimeout(typeLoop, HOLD_TIME);
  }

  /* ---------- 6. PROFILE IMAGE FALLBACK ---------- */
  const profileImg = document.getElementById('profileImg');
  const profileFallback = document.getElementById('profileFallback');

  if (profileImg && profileFallback) {
    profileImg.addEventListener('error', () => {
      profileImg.hidden = true;
      profileFallback.hidden = false;
    });
  }

  /* ---------- 7. SCROLL-TO-TOP BUTTON ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    };
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ---------- 8. CURRENT YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
