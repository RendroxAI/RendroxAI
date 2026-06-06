/* ============================================================
   ui.js – Core UI interactions
   ============================================================ */

// ─── Navbar ──────────────────────────────────────────────────
function initNavbar() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  if (!header) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }
}


// ─── Theme Toggle ────────────────────────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const STORAGE_KEY = 'aetheris-theme';
  const moonIcon = btn.querySelector('.icon-moon');
  const sunIcon  = btn.querySelector('.icon-sun');

  function applyTheme(light) {
    document.body.classList.toggle('light-theme', light);
    btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    if (moonIcon) moonIcon.style.display = light ? 'none' : 'block';
    if (sunIcon)  sunIcon.style.display  = light ? 'block' : 'none';
  }

  // Load saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') applyTheme(true);
  else applyTheme(false);

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    const next = !isLight;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? 'light' : 'dark');
  });
}


// ─── 3D Tilt Effect ─────────────────────────────────────────
function initTiltEffect() {
  const selectors = '.service-card, .visualizer-card, .roi-calculator-card, .contact-form-card';
  const cards = document.querySelectorAll(selectors);
  const MAX_TILT = 8;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltY = ((x - cx) / cx) * MAX_TILT;
      const tiltX = ((cy - y) / cy) * MAX_TILT;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  });
}


// ─── Scroll Reveal ───────────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((el) => observer.observe(el));
}


// ─── Portfolio Tabs ──────────────────────────────────────────
function initPortfolioTabs() {
  const triggers = document.querySelectorAll('.tab-trigger');
  const panels   = document.querySelectorAll('.portfolio-content-panel');
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const tab = trigger.dataset.tab;

      // Toggle active triggers
      triggers.forEach((t) => t.classList.toggle('active', t === trigger));

      // Toggle panels
      panels.forEach((p) => {
        p.classList.toggle('active', p.id === tab || p.dataset.tab === tab);
      });
    });
  });
}


// ─── FAQ Accordion ───────────────────────────────────────────
function initFAQAccordion() {
  const headers = document.querySelectorAll('.faq-header');
  if (!headers.length) return;

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all first (accordion)
      document.querySelectorAll('.faq-item.active').forEach((item) => {
        item.classList.remove('active');
      });

      // Open clicked if it wasn't already open
      if (!isActive) parent.classList.add('active');
    });
  });
}


// ─── Contact Form ────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('lead-contact-form');
  const card = document.getElementById('contact-form-card');
  if (!form || !card) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ticketId = `AE-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

    card.innerHTML = `
      <div class="form-success">
        <div class="success-logo-ring">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="url(#grad-ring)" stroke-width="3"
                    stroke-dasharray="226" stroke-dashoffset="226">
              <animate attributeName="stroke-dashoffset" from="226" to="0" dur="1s" fill="freeze" />
            </circle>
            <polyline points="26,42 36,52 56,30" fill="none" stroke="#00e6ff" stroke-width="3"
                      stroke-linecap="round" stroke-linejoin="round"
                      stroke-dasharray="60" stroke-dashoffset="60">
              <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.5s" begin="0.8s" fill="freeze" />
            </polyline>
            <defs>
              <linearGradient id="grad-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#a882ff"/>
                <stop offset="100%" stop-color="#00e6ff"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 class="success-heading">Request Deployed</h3>
        <p class="success-description">
          Your brief has been encrypted and dispatched to our solutions team.<br>
          We'll respond within 24 hours with a tailored strategy.
        </p>
        <span class="success-ticket">Ticket ${ticketId}</span>
      </div>
    `;
  });
}


// ─── Preloader ───────────────────────────────────────────────
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const percentText = preloader?.querySelector('.preloader-percent');
  if (!preloader) return;

  let percent = 0;
  const duration = 2000; // 2 seconds
  const intervalTime = 30;
  const step = 100 / (duration / intervalTime);

  const ticker = setInterval(() => {
    percent += step;
    if (percent >= 100) {
      percent = 100;
      clearInterval(ticker);
    }
    if (percentText) {
      percentText.textContent = `${Math.floor(percent)}%`;
    }
  }, intervalTime);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(ticker);
      if (percentText) percentText.textContent = '100%';
      preloader.classList.add('preloader-hidden');
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
      }, { once: true });
    }, 2500);
  });
}
