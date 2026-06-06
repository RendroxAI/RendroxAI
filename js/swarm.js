/* ============================================================
   swarm.js – Multi‑agent swarm visualiser
   ============================================================ */

function initSwarmCanvas() {
  const container = document.getElementById('swarm-canvas-container');
  const canvas = document.getElementById('swarm-canvas');
  if (!canvas || !container) return;
  const ctx = canvas.getContext('2d');

  let W, H;

  function resize() {
    W = canvas.width = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }

  /* ── Broker Node ────────────────────────────────────────── */
  class BrokerNode {
    constructor(x, y, color) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 8;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.floatPhaseX = Math.random() * Math.PI * 2;
      this.floatPhaseY = Math.random() * Math.PI * 2;
      this.floatSpeedX = 0.003 + Math.random() * 0.004;
      this.floatSpeedY = 0.004 + Math.random() * 0.003;
      this.floatAmplitude = 12 + Math.random() * 8;
    }

    update(t) {
      this.pulsePhase += 0.04;
      this.floatPhaseX += this.floatSpeedX;
      this.floatPhaseY += this.floatSpeedY;
      this.x = this.baseX + Math.sin(this.floatPhaseX) * this.floatAmplitude;
      this.y = this.baseY + Math.cos(this.floatPhaseY) * this.floatAmplitude;
    }

    draw() {
      const pulse = Math.sin(this.pulsePhase) * 0.35 + 0.65;
      // Pulsing ring
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 10 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = this.color.replace('1)', `${0.25 * pulse})`);
      ctx.lineWidth = 2;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 18;
      ctx.stroke();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 22;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* ── Agent Node ─────────────────────────────────────────── */
  class AgentNode {
    constructor(brokerIndex) {
      this.brokerIndex = brokerIndex;
      this.orbitDist = 45 + Math.random() * 70;
      this.orbitSpeed = (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1);
      this.angle = Math.random() * Math.PI * 2;
      this.size = 2 + Math.random() * 2;
      this.alpha = 0.5 + Math.random() * 0.5;
      this.x = 0;
      this.y = 0;
    }

    update(brokers) {
      // Chance to switch broker
      if (Math.random() < 0.002) {
        let newBroker;
        do { newBroker = Math.floor(Math.random() * brokers.length); }
        while (newBroker === this.brokerIndex && brokers.length > 1);
        this.brokerIndex = newBroker;
      }

      this.angle += this.orbitSpeed;
      const b = brokers[this.brokerIndex];
      this.x = b.x + Math.cos(this.angle) * this.orbitDist;
      this.y = b.y + Math.sin(this.angle) * this.orbitDist;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 130, 255, ${this.alpha})`;
      ctx.shadowColor = 'rgba(168, 130, 255, 0.7)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* ── Setup ──────────────────────────────────────────────── */
  resize();

  const brokerColor = 'rgba(0, 230, 255, 1)';
  const brokers = [
    new BrokerNode(W * 0.25, H * 0.4, brokerColor),
    new BrokerNode(W * 0.6,  H * 0.3, brokerColor),
    new BrokerNode(W * 0.5,  H * 0.72, brokerColor),
  ];

  const agents = [];
  for (let i = 0; i < 32; i++) {
    agents.push(new AgentNode(i % brokers.length));
  }

  /* ── Draw triangle mesh between brokers ─────────────────── */
  function drawBrokerMesh() {
    ctx.beginPath();
    ctx.moveTo(brokers[0].x, brokers[0].y);
    for (let i = 1; i < brokers.length; i++) {
      ctx.lineTo(brokers[i].x, brokers[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 230, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.shadowColor = 'rgba(0, 230, 255, 0.3)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  /* ── Draw agent‑to‑broker links ─────────────────────────── */
  function drawLinks() {
    for (const a of agents) {
      const b = brokers[a.brokerIndex];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.max(0, 0.08 * (1 - dist / 140));
      if (alpha > 0.01) {
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(a.x, a.y);
        ctx.strokeStyle = `rgba(168, 130, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  /* ── Loop ───────────────────────────────────────────────── */
  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t++;

    for (const b of brokers) b.update(t);
    for (const a of agents) a.update(brokers);

    drawBrokerMesh();
    drawLinks();
    for (const a of agents) a.draw();
    for (const b of brokers) b.draw();

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    brokers[0].baseX = W * 0.25; brokers[0].baseY = H * 0.4;
    brokers[1].baseX = W * 0.6;  brokers[1].baseY = H * 0.3;
    brokers[2].baseX = W * 0.5;  brokers[2].baseY = H * 0.72;
  });

  requestAnimationFrame(loop);
}
