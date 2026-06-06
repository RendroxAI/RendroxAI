# Immersive Modular Corporate Portfolio Upgrade (Aetheris AI)

Upgrading the website into an immersive, modular web application with loaded animations, segmented styles/logic, theme toggling (Dark/Light), a dedicated project details page (`usecases.html`) with animated SVG graphs, and enhanced cosmic light highlights.

---

## Technical Segmentation & Modularization

To make the site highly maintainable, we will divide the monolithic files into organized directories:

### 📁 Stylesheets (`/css/`)
We will create a subfolder `/css/` and segment styling rules:
- `style.css` (at root) - Imports all sub-sheets using `@import`.
- `css/theme.css` - Custom design properties, color systems, and dark/light variables.
- `css/base.css` - Global resets, resets, font styles, typography, scrollbars, and container utilities.
- `css/components.css` - Navbar capsules, buttons, inputs, glassmorphic panel defaults, and preloader elements.
- `css/sections.css` - Detailed layouts of all sections: Hero, Services, Case Tabs, ROI, Swarm Canvas, Terminal, FAQs, and Contact Form.
- `css/animations.css` - Keyframe sets: comets, floating cards, gradient shimmers, typewriter, and scroll reveals.

### 📁 Script Modules (`/js/`)
We will enable ES module structure. The root file `app.js` will act as the master initializer, importing modules from `/js/`:
- `app.js` (at root) - Entry point (loads scripts as ES modules).
- `js/particles.js` - Background canvas Plexus logic, mouse hover deflection, and shooting comets.
- `js/swarm.js` - Orchestrator canvas agent nodes, broker pulses, and orbit paths.
- `js/roi.js` - ROI slider variables, mathematical formulas, and numerical count animations.
- `js/terminal.js` - CLI command simulations, custom response typewriter strings.
- `js/ui.js` - Theme switching logic, accordion toggles, portfolio tab triggers, contact responses, and scroll reveals.

---

## New Core Features

### 1. Futuristic Page Preloader
- Displays a high-tech boot-up screen when the page loads.
- Displays "AETHERIS_AI // BOOTING..." with a rotating logo ring and a percentage ticker ($0\% \rightarrow 100\%$).
- Once completed, it slides up and reveals the homepage with staggered fade-in animations.

### 2. Switchable Dark Mode & Light Mode
- Adds a toggle switch with Sun and Moon SVGs in the header capsule.
- Implements class toggling (`.light-theme`) on the document body, triggering CSS variables swap.
- **Light Theme Design**: Changes backgrounds to a premium translucent cyber-lab white (`#f5f6fa`), replacing dark panels with glowing white glass containers having bright cyan and indigo glowing drop-shadows.

### 3. Cosmic Light Accents & Shimmers
- Incorporates multiple ambient nebulae blur spots (`ambient-glow-3`) with electric pink, purple, and blue hues.
- Adds comets/sparks (random shooting lines) into the particle background canvas.
- Incorporates a global mouse-tracking radial highlight that hovers behind the text contents.

### 4. Dedicated Case Details Page (`usecases.html`)
- Deploys a separate page showing full workflow steps and technical specifications for the three PPTX automations.
- Includes animated SVG charts:
  - **Reconciliation Time Savings**: A side-by-side comparison bar chart (Manual: 4h vs Bot: 3m).
  - **Storefront Order Ingestion Capacity**: Comparison line graph (Manual vs Parallel robot capability).
  - **Accuracy & Exception Rate**: Pulse dial highlighting 0% silent error logs.
- Features a returning home navbar capsule, preloader, and theme toggling.

---

## Proposed Changes

We will create and modify:
- `index.html` - Modify navigation, add preloader, theme toggle.
- `style.css` - Change to a master import sheet.
- `/css/theme.css`, `base.css`, `components.css`, `sections.css`, `animations.css` - [NEW] segmented stylesheets.
- `app.js` - Change to entry module importer.
- `/js/particles.js`, `swarm.js`, `roi.js`, `terminal.js`, `ui.js` - [NEW] modular scripts.
- `usecases.html` - [NEW] project details page.

---

## Verification Plan

### Automated Checks
- Check JS modules import compatibility.

### Manual Verification
1. Open `index.html` to review the preloader screen and booting text.
2. Toggle the Dark/Light Mode switch in the navbar and verify transitions between neon black and cyber-white layouts.
3. Click "View Full Case Studies" and navigate to `usecases.html`.
4. Verify SVG bar chart animations when entering the viewport on `usecases.html`.
5. Run bot simulation terminal CLI macros to check console outputs.
