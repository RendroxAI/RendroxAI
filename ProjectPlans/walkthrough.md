# Aetheris AI Company Portfolio Walkthrough

We have upgraded the landing page into a premium, responsive **Company Portfolio Page** for **Aetheris AI**, showcasing real-world automation capabilities and projects. All actual client, brand, system, and platform names from the original PowerPoint presentations have been replaced with professional generic terms (e.g., *Tier-1 ERP System* instead of *SAP*, *Global E-Commerce Storefront* instead of *Shopify*, *Multi-Channel Marketplace* instead of *Lazada*).

Below is the walkthrough of the upgraded portfolio features and visuals.

---

## 🎨 Visual Mockup

The high-fidelity mockup below captures the company portfolio theme, showcasing the tabbed case studies, range sliders for the ROI savings estimator, and the glassmorphic contact form card:

![Aetheris AI Portfolio Landing Page Mockup](/C:/Users/adity/.gemini/antigravity/brain/e8c1c9cf-ca07-4a18-bf05-01174be62c93/aetheris_portfolio_mockup_1780751400510.png)

---

## 🚀 Key Modules Deployed

### 1. Headline Pitch & Telemetry Dashboard
- **Slogan**: "We Engineer Autonomous Digital Workforces."
- **Mockup Details**: Retained the floating 3D-angled dashboard. Telemetry metrics are updated to focus on portfolio achievements: *18.5k Total Hours Saved*, *99.99% System Uptime*, and *0.00% Process Error Rate*.

### 2. Services / Automation Capabilities Grid
We built a responsive grid highlighting four core services delivered by the startup:
- **Intelligent Accounts Receivable (AR) Clearing**: Auto-matching payment advices, ledger lookups, and reconciliation checks.
- **Storefront ERP Integration**: Processing storefront orders straight into centralized master databases with inventory and payment sync.
- **Supply Chain Dispatch**: Label unzipping, shipping status packing, customer license verification, and backorder releases.
- **Document Parsing & OCR**: Extracting structured tabular details from PDF, CSV, Excel, and TXT files.

### 3. Interactive Case Studies Tabs (PPTX-Extracted Projects)
A tabbed layout allows prospects to review three main projects derived from the company's PPTXs:
- **Accounts Receivable Clearing Bot**:
  - *Details*: Auto-ingests payment advices from a *Corporate Mail Server*, extracts data fields, reconciles items against customer ledgers via FIFO matching, and posts clearing logs to a *Tier-1 ERP System*.
  - *Gains*: **100% Unattended**, **450+ Hours Saved / Month**, **$120k+ Est. Annual Savings**, **Zero Silent Errors**.
- **E-Commerce to ERP Sales Order Bot**:
  - *Details*: Captures digital transactions, verifies stock across multiple warehouses using rules engine decision tables, posts orders via API integration endpoints, distributes bundle pricing to child components, and reconciles checkout/refund balances.
  - *Gains*: **152k+ Orders Processed / Batch Run**, **Near-Real-Time Order Sync**, **$85k Error Reductions**, **100% Audit Traceability**.
- **Logistics & License Dispatch Bot**:
  - *Details*: Automates Lazada extraction, updates shipping codes to *packed*, queries customer licensing records via XD03/VX01N databases, and releases backorders into outbound delivery documents via BAPI logs.
  - *Gains*: **92% Admin Time Reduction**, **99.9% Uptime**, **200+ Analyst Hours Saved / Month**.

### 4. Interactive ROI Savings Calculator
- **Inputs (Sliders)**:
  - *Monthly Manual Tasks*: 100 to 10,000 tasks.
  - *Manual Time Spent per Task*: 2 to 60 minutes.
  - *Average Hourly Labor Rate*: $15 to $150.
- **Interactions**: As users slide the indicators, JavaScript performs real-time calculations:
  - $\text{Annual Hours Saved} = \frac{\text{Volume} \times \text{Minutes}}{60} \times 0.92 \times 12$ (Assuming a 92% average automation efficiency gain).
  - $\text{Annual Cost Savings} = \text{Annual Hours Saved} \times \text{Hourly Rate}$.
  - Results update instantly with smooth counter animations.

### 5. Simulator Sandbox Upgrades
The interactive developer console CLI now lets prospective clients "test-run" three bot simulations using suggestions:
- `run ar-bot`: Displays log typewriter lines mapping advice lines to schemas, scanning FBL5N, and posting F-28 documents.
- `run sales-bot`: Displays order validation logs, stock checks, pricing splits, and CPI gateway postings.
- `run supply-bot`: Displays marketplace fetches, license validations, packed updates, and BAPI delivery releases.
- Standard options like `help` and `clear` are fully integrated.

### 6. Accordion FAQs
Collapsible panels answer enterprise questions:
- *Onboarding times*: Setup takes under 5 days due to layout configuration separation.
- *Anomaly handling*: Exception items are quarantined to prevent ledger errors.
- *Legacy integrations*: Hybrids of API gateways and unattended desktop RPA scripts support legacy ERP platforms.
- *Data privacy*: Processed in-memory locally, zero long-term records saved.

### 7. Contact Us Form
- **Fields**: Name, Corporate Email, Company Name, Required Service (dropdown), and Process Description.
- **Interactions**: On submit, client-side scripts hide inputs and render a high-tech "Ticket Received" confirmation screen, generating a randomized ticket ID (e.g. `L-829401`) to match the console style.

---

## 📂 Code Files
- **Landing Page**: [index.html](file:///c:/Users/adity/OneDrive/Desktop/AI%20Startup%20page/index.html)
- **Style sheet**: [style.css](file:///c:/Users/adity/OneDrive/Desktop/AI%20Startup%20page/style.css)
- **Interaction Logic**: [app.js](file:///c:/Users/adity/OneDrive/Desktop/AI%20Startup%20page/app.js)
- **Visual mockup**: [aetheris_portfolio_mockup_1780751400510.png](file:///C:/Users/adity/.gemini/antigravity/brain/e8c1c9cf-ca07-4a18-bf05-01174be62c93/aetheris_portfolio_mockup_1780751400510.png)
