/* ============================================================
   terminal.js – Interactive terminal sandbox
   ============================================================ */

function initTerminalSandbox() {
  const body  = document.getElementById('terminal-body');
  const form  = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const suggestions = document.querySelectorAll('.suggestion-btn');
  if (!body || !form || !input) return;

  let busy = false;   // prevent input while simulation runs

  /* ── Append a line ──────────────────────────────────────── */
  function appendLine(text, type = '') {
    const div = document.createElement('div');
    div.classList.add('terminal-line');
    if (type) div.classList.add(`terminal-${type}`);
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  /* ── Sequenced output helper ────────────────────────────── */
  function sequenceLines(lines, onDone) {
    busy = true;
    let i = 0;
    function next() {
      if (i >= lines.length) { busy = false; if (onDone) onDone(); return; }
      const { text, type, delay } = lines[i];
      setTimeout(() => { appendLine(text, type); i++; next(); }, delay);
    }
    next();
  }

  /* ── Welcome ────────────────────────────────────────────── */
  sequenceLines([
    { text: 'Aetheris Runtime v4.2.0 — neural mesh active', type: 'system', delay: 0 },
    { text: 'Secure tunnel established • TLS 1.3 • 256‑bit AES‑GCM', type: 'system', delay: 300 },
    { text: 'Type "help" for available commands.', type: 'accent', delay: 600 },
  ]);

  /* ── Process commands ───────────────────────────────────── */
  function processCommand(cmd) {
    const c = cmd.trim().toLowerCase();

    if (c === 'help') {
      appendLine('┌──────────────────────────────────────┐', 'system');
      appendLine('│  Available Commands                  │', 'accent');
      appendLine('├──────────────────────────────────────┤', 'system');
      appendLine('│  run ar-bot       Accounts receivable│', 'system');
      appendLine('│  run sales-bot    Order‑to‑cash sync │', 'system');
      appendLine('│  run supply-bot   Logistics pipeline │', 'system');
      appendLine('│  clear            Wipe terminal      │', 'system');
      appendLine('│  help             Show this menu     │', 'system');
      appendLine('└──────────────────────────────────────┘', 'system');
      return;
    }

    if (c === 'clear') {
      body.innerHTML = '';
      return;
    }

    if (c === 'run ar-bot') {
      sequenceLines([
        { text: '[ar‑bot]  Initialising AR clearing pipeline…',               type: 'accent',  delay: 0 },
        { text: '[ar‑bot]  ▸ Parsing 247 vendor PDF invoices (OCR + NER)…',   type: 'system',  delay: 500 },
        { text: '[ar‑bot]  ▸ Cross‑referencing GL sub‑ledger lookup…',        type: 'system',  delay: 900 },
        { text: '[ar‑bot]  ▸ Applying FIFO ageing match on ₹18.4 Cr open items…', type: 'system', delay: 800 },
        { text: '[ar‑bot]  ▸ Computing TDS §194C / §194J deduction matrix…',  type: 'system',  delay: 700 },
        { text: '[ar‑bot]  ▸ Posting matched entries to SAP F‑28 module…',    type: 'system',  delay: 600 },
        { text: '[ar‑bot]  ✓ Pipeline complete — 231/247 invoices auto‑reconciled (93.5 %)', type: 'success', delay: 500 },
      ]);
      return;
    }

    if (c === 'run sales-bot') {
      sequenceLines([
        { text: '[sales‑bot]  Launching order‑to‑cash sync engine…',           type: 'accent',  delay: 0 },
        { text: '[sales‑bot]  ▸ Ingesting 1,842 Shopify order payloads (JSON→DTO)…', type: 'system', delay: 500 },
        { text: '[sales‑bot]  ▸ Running idempotence check against order_hash index…', type: 'system', delay: 700 },
        { text: '[sales‑bot]  ▸ Querying real‑time stock levels via warehouse WMS API…', type: 'system', delay: 800 },
        { text: '[sales‑bot]  ▸ Integrating CPI pricing engine (dynamic margin calc)…', type: 'system', delay: 750 },
        { text: '[sales‑bot]  ▸ Applying bundle discount rules & promo code validation…', type: 'system', delay: 650 },
        { text: '[sales‑bot]  ▸ Reconciling Stripe/Razorpay settlements against ledger…', type: 'system', delay: 600 },
        { text: '[sales‑bot]  ✓ Sync complete — 1,838 orders pushed, 4 flagged for review', type: 'success', delay: 500 },
      ]);
      return;
    }

    if (c === 'run supply-bot') {
      sequenceLines([
        { text: '[supply‑bot]  Spinning up logistics orchestration pipeline…',  type: 'accent',  delay: 0 },
        { text: '[supply‑bot]  ▸ Querying carrier rate API (FedEx/DHL/BlueDart)…', type: 'system', delay: 600 },
        { text: '[supply‑bot]  ▸ Generating AWB labels & export packing list PDF…', type: 'system', delay: 800 },
        { text: '[supply‑bot]  ▸ Validating FSSAI / BIS license compliance matrix…', type: 'system', delay: 750 },
        { text: '[supply‑bot]  ▸ Updating ERP inbound shipment status (ASN push)…', type: 'system', delay: 700 },
        { text: '[supply‑bot]  ▸ Triggering back‑order release for 38 SKUs…',      type: 'system', delay: 650 },
        { text: '[supply‑bot]  ▸ Creating last‑mile delivery slots via hyperlocal API…', type: 'system', delay: 600 },
        { text: '[supply‑bot]  ✓ Pipeline complete — 412 shipments dispatched, avg transit 2.1 days', type: 'success', delay: 500 },
      ]);
      return;
    }

    // Unknown
    appendLine(`Command not found: "${cmd}". Type "help" for options.`, 'echo');
  }

  /* ── Form submit ────────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) return;
    const val = input.value.trim();
    if (!val) return;
    appendLine(`$ ${val}`, 'echo');
    input.value = '';
    processCommand(val);
  });

  /* ── Suggestion buttons ─────────────────────────────────── */
  suggestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (busy) return;
      const cmd = btn.dataset.cmd || btn.textContent.trim();
      appendLine(`$ ${cmd}`, 'echo');
      processCommand(cmd);
    });
  });
}
