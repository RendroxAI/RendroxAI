/* ============================================================
   particles.js – Plexus canvas + comet streaks + cursor glow
   ============================================================ */

// ─── Plexus Canvas ───────────────────────────────────────────
function initPlexusCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let particles = [];
  let comets = [];
  let mouse = { x: -9999, y: -9999 };
  let lastCometSpawn = 0;
  const COMET_INTERVAL = 3000;        // ms
  const CONNECTION_DIST = 120;
  const MOUSE_RADIUS = 150;
  const MAX_PARTICLES = 130;

  /* ── helpers ────────────────────────────────────────────── */
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ── Particle class ─────────────────────────────────────── */
  class Particle {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2.2 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        this.vx += (dx / dist) * force * 0.8;
        this.vy += (dy / dist) * force * 0.8;
      }

      // Damping
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      // Bounce
      if (this.x < 0) { this.x = 0; this.vx *= -1; }
      if (this.x > W) { this.x = W; this.vx *= -1; }
      if (this.y < 0) { this.y = 0; this.vy *= -1; }
      if (this.y > H) { this.y = H; this.vy *= -1; }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 130, 255, ${this.alpha})`;
      ctx.shadowColor = 'rgba(168, 130, 255, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* ── Comet class (shooting‑star streak) ─────────────────── */
  class Comet {
    constructor() {
      // Spawn from random edge, streak diagonally
      const side = Math.random();
      if (side < 0.5) {
        this.x = -10;
        this.y = Math.random() * H * 0.6;
      } else {
        this.x = Math.random() * W * 0.6;
        this.y = -10;
      }
      const angle = Math.random() * 0.6 + 0.3;   // ~20–50 deg
      const speed = Math.random() * 4 + 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.trail = [];
      this.trailMax = 28;
      this.life = 1;
      this.decay = 0.006 + Math.random() * 0.004;
      this.size = Math.random() * 1.8 + 1.2;
      this.hue = Math.random() > 0.5 ? 270 : 190;  // purple or cyan
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailMax) this.trail.shift();
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
    }

    draw() {
      // Gradient trail
      const len = this.trail.length;
      for (let i = 1; i < len; i++) {
        const t = i / len;
        const alpha = t * this.life * 0.7;
        ctx.beginPath();
        ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
        ctx.strokeStyle = `hsla(${this.hue}, 90%, 70%, ${alpha})`;
        ctx.lineWidth = this.size * t;
        ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, ${alpha * 0.8})`;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }

      // Head glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 85%, ${this.life})`;
      ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, ${this.life})`;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    get alive() {
      return this.life > 0 && this.x < W + 50 && this.y < H + 50;
    }
  }

  /* ── connections ────────────────────────────────────────── */
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 230, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  /* ── populate ───────────────────────────────────────────── */
  function populate() {
    particles = [];
    const area = W * H;
    const count = Math.min(MAX_PARTICLES, Math.floor(area / 12000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  /* ── loop ───────────────────────────────────────────────── */
  function loop(now) {
    ctx.clearRect(0, 0, W, H);

    // Particles
    for (const p of particles) { p.update(); p.draw(); }
    drawConnections();

    // Spawn comets
    if (now - lastCometSpawn > COMET_INTERVAL) {
      comets.push(new Comet());
      lastCometSpawn = now;
    }

    // Comets
    for (let i = comets.length - 1; i >= 0; i--) {
      comets[i].update();
      comets[i].draw();
      if (!comets[i].alive) comets.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }

  /* ── events ─────────────────────────────────────────────── */
  window.addEventListener('resize', () => { resize(); populate(); });
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ── boot ───────────────────────────────────────────────── */
  resize();
  populate();
  requestAnimationFrame(loop);
}


// ─── Mouse Glow ──────────────────────────────────────────────
function initMouseGlow() {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-gx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-gy', `${e.clientY}px`);
  });
}
