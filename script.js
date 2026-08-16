/* ============================================================
   KALICHARAN MURMU — PORTFOLIO SCRIPT
   Sections:
   1. Mobile nav toggle
   2. Smooth scroll for internal links
   3. Scroll-to-top button
   4. Active nav link tracking
   5. Scroll-reveal animations
   6. Hero typing animation
   7. Navbar style on scroll
   8. Profile image load/error handling
   9. Count-up stat animation
   10. Contact form submission (Formspree)
   11. Auto-generated footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Mobile nav toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function closeMenu(){
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- 2. Smooth scroll for internal links ---------- */
  document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetSelector = el.getAttribute('data-target') || el.getAttribute('href');
      if (!targetSelector || !targetSelector.startsWith('#')) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  /* ---------- 3. Scroll-to-top button ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop(){
    if (window.scrollY > 480){
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- 4. Active nav link tracking ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkMap.set(link.getAttribute('href'), link);
  });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = '#' + entry.target.id;
        navLinkMap.forEach((link, href) => {
          link.classList.toggle('active', href === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- 5. Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion){
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 6. Hero typing animation ---------- */
  const typedTextEl = document.getElementById('typedText');
  const roles = ['Student', 'Developer', 'Learner', 'Future Entrepreneur'];

  if (prefersReducedMotion){
    typedTextEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = false;

    function typeLoop(){
      const currentRole = roles[roleIndex];

      if (isDeleting){
        charIndex--;
      } else {
        charIndex++;
      }

      typedTextEl.textContent = currentRole.substring(0, charIndex);

      let delay = isDeleting ? 45 : 90;

      if (!isDeleting && charIndex === currentRole.length){
        delay = 1400;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0){
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }

      setTimeout(typeLoop, delay);
    }

    setTimeout(typeLoop, 1400);
  }

  /* ---------- 7. Navbar style on scroll ---------- */
  const navbar = document.getElementById('navbar');

  function toggleNavbarScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  /* Combined scroll listener (nav shrink + scroll-top button) */
  window.addEventListener('scroll', () => {
    toggleNavbarScroll();
    toggleScrollTop();
  }, { passive: true });

  toggleNavbarScroll();
  toggleScrollTop();

  /* ---------- 8. Profile image load/error handling ---------- */
  const profilePhoto = document.getElementById('profilePhoto');
  const profilePlaceholder = document.getElementById('profilePlaceholder');

  profilePhoto.addEventListener('load', () => {
    if (profilePhoto.naturalWidth > 0){
      profilePhoto.classList.add('loaded');
      profilePlaceholder.style.display = 'none';
    }
  });

  profilePhoto.addEventListener('error', () => {
    profilePhoto.classList.remove('loaded');
    profilePhoto.style.display = 'none';
    profilePlaceholder.style.display = 'flex';
  });

  /* If the image was already cached/loaded before listeners attached */
  if (profilePhoto.complete && profilePhoto.naturalWidth > 0){
    profilePhoto.classList.add('loaded');
    profilePlaceholder.style.display = 'none';
  }

  /* ---------- 9. Count-up stat animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  function animateCount(el){
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion){
      el.textContent = target + suffix;
      return;
    }

    const duration = 1400;
    let startTime = null;

    function easeOutCubic(t){
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp){
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;

      if (progress < 1){
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  /* ---------- 10. Contact form submission (Formspree) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formSubmitBtn = document.getElementById('formSubmit');
  const btnLabel = formSubmitBtn.querySelector('.btn-label');
  const btnSpinner = formSubmitBtn.querySelector('.btn-spinner');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formAction = contactForm.getAttribute('action');
    formStatus.textContent = '';
    formStatus.classList.remove('success', 'error');

    if (!formAction || formAction.includes('YOUR_FORM_ID')){
      formStatus.textContent = 'This form is not connected yet — add your Formspree form ID to start receiving messages.';
      formStatus.classList.add('error');
      return;
    }

    formSubmitBtn.disabled = true;
    btnLabel.textContent = 'Sending...';
    btnSpinner.hidden = false;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok){
        formStatus.textContent = 'Thanks for reaching out — your message has been sent.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const data = await response.json().catch(() => null);
        const msg = (data && data.errors && data.errors.length)
          ? data.errors.map(err => err.message).join(', ')
          : 'Something went wrong. Please try again or email me directly.';
        formStatus.textContent = msg;
        formStatus.classList.add('error');
      }
    } catch (err){
      formStatus.textContent = 'Network error — please try again or email me directly.';
      formStatus.classList.add('error');
    } finally {
      formSubmitBtn.disabled = false;
      btnLabel.textContent = 'Send Message';
      btnSpinner.hidden = true;
    }
  });

  /* ---------- 11. Auto-generated footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
