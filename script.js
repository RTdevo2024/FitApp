const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-link');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const ctaButtons = document.querySelectorAll('.btn');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('is-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -20px 0px'
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    threshold: 0.55
  }
);

sections.forEach((section) => navObserver.observe(section));

ctaButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('is-loading');
    setTimeout(() => btn.classList.remove('is-loading'), 350);
  });
});
