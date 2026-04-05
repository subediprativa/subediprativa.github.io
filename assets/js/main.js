/* ===== MAIN.JS — Prativa Subedi Personal Site ===== */

// ── Dark Mode Toggle ──────────────────────────────────────────────────────────
const html        = document.documentElement;
const darkToggle  = document.getElementById('dark-toggle');
const sunIcon     = document.getElementById('icon-sun');
const moonIcon    = document.getElementById('icon-moon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

function syncIcons() {
  const isDark = html.classList.contains('dark');
  sunIcon.classList.toggle('hidden', !isDark);
  moonIcon.classList.toggle('hidden', isDark);
}
syncIcons();

darkToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  syncIcons();
});

// ── Mobile Nav Toggle ─────────────────────────────────────────────────────────
const mobileMenuBtn  = document.getElementById('mobile-menu-btn');
const mobileMenu     = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ── Scroll-triggered Fade-in ──────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ── Skill Bars (animate on scroll) ───────────────────────────────────────────
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
          const w = bar.dataset.width;
          bar.style.width = w;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const skillSection = document.getElementById('toolkit');
if (skillSection) skillObserver.observe(skillSection);

// ── Active Nav Highlight on Scroll ───────────────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('text-teal-500');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('text-teal-500');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));

// ── Sticky Nav shadow on scroll ───────────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('shadow-md');
  } else {
    nav.classList.remove('shadow-md');
  }
}, { passive: true });
