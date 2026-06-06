/* ============================================================
   roi.js – ROI Calculator + Animated metrics counters
   ============================================================ */

// ─── ROI Calculator ──────────────────────────────────────────
function initROICalculator() {
  const volumeSlider = document.getElementById('roi-volume');
  const timeSlider   = document.getElementById('roi-time');
  const rateSlider   = document.getElementById('roi-rate');
  if (!volumeSlider || !timeSlider || !rateSlider) return;

  const volumeReadout = document.getElementById('roi-volume-val');
  const timeReadout   = document.getElementById('roi-time-val');
  const rateReadout   = document.getElementById('roi-rate-val');

  const hoursSavedEl  = document.getElementById('roi-hours-saved');
  const cashSavedEl   = document.getElementById('roi-cash-saved');

  function formatNumber(n) {
    return n.toLocaleString('en-US');
  }

  function calculate() {
    const vol  = parseInt(volumeSlider.value, 10);
    const mins = parseInt(timeSlider.value, 10);
    const rate = parseInt(rateSlider.value, 10);

    // Update readouts
    if (volumeReadout) volumeReadout.textContent = formatNumber(vol);
    if (timeReadout)   timeReadout.textContent   = `${mins} min`;
    if (rateReadout)   rateReadout.textContent    = `$${rate}`;

    // Calculations
    const monthlyManualHours = (vol * mins) / 60;
    const monthlySaved       = monthlyManualHours * 0.92;
    const annualHours        = Math.round(monthlySaved * 12);
    const annualCash         = Math.round(annualHours * rate);

    // Display
    if (hoursSavedEl) hoursSavedEl.textContent = formatNumber(annualHours);
    if (cashSavedEl)  cashSavedEl.textContent  = `$${formatNumber(annualCash)}`;
  }

  // Sync slider track fill via CSS custom property (optional visual polish)
  function syncTrackFill(slider) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill', `${pct}%`);
  }

  [volumeSlider, timeSlider, rateSlider].forEach((s) => {
    s.addEventListener('input', () => {
      calculate();
      syncTrackFill(s);
    });
    syncTrackFill(s);
  });

  // Initial calculation
  calculate();
}


// ─── Metrics Counter ─────────────────────────────────────────
function initMetricsCounter() {
  const counters = document.querySelectorAll('.stat-count');
  if (!counters.length) return;

  const observed = new Set();

  function animateCount(el) {
    const target   = parseFloat(el.dataset.target) || 0;
    const speed    = parseInt(el.dataset.speed, 10) || 2000; // duration ms
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const start    = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / speed, 1);
      // ease‑out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;

      el.textContent = `${prefix}${current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.3 }
  );

  counters.forEach((c) => observer.observe(c));
}
