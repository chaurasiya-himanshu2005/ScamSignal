# ScamSignal 🛡️

**ScamSignal** is an open-source, privacy-first web application designed to help people assess suspicious SMS, WhatsApp messages, and emails. By detecting social engineering indicators—such as synthetic urgency, threats, OTP demands, lookalike domains, and unconventional payment requests—ScamSignal provides a cautious, objective second opinion and plain-language defensive advice.

---

## 📑 Table of Contents
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Security & Privacy Safeguards](#security--privacy-safeguards)
- [Tech Stack](#tech-stack)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Step 1: Publish to a Public GitHub Repository](#step-1-publish-to-a-public-github-repository)
- [Step 2: Deploy to Vercel & Configure AI Keys](#step-2-deploy-to-vercel--configure-ai-keys)
- [Step 3: Google Search Console & SEO Readiness](#step-3-google-search-console--seo-readiness)
- [Important Limitations & Disclaimers](#important-limitations--disclaimers)
- [License](#license)

---

## 🚀 Key Features

- **Multi-Channel Support**: Tailored analysis for SMS, WhatsApp chats, emails, or unspecified messages.
- **Cautious Risk Assessment**: Categorizes messages into three explicit levels:
  - `Several warning signs` (High Risk)
  - `Some warning signs` (Medium Risk)
  - `No obvious warning signs found` (Low Risk)
- **Evidence-Based Reporting**: Quotes exact excerpts from the message as evidence, clearly separating raw quoted phrases from AI interpretation.
- **Accessible Visual Indicators**: Risk levels are distinguished using distinct icons, accessible color contrast, and descriptive badges—never relying on color alone.
- **Defanged & Non-Clickable Links**: External URLs and domains are strictly rendered as inert, non-clickable text to protect users from accidental navigation.
- **Zero-Storage Privacy Architecture**: Submitted messages are processed transiently in server memory and are never persisted in a database or logs.
- **Prompt Injection Defense**: Raw user text is enclosed within `<UNTRUSTED_MESSAGE>` tags and treated as untrusted data to resist prompt override attempts.
- **Demo / Fallback Mode**: If no AI API key is configured or if the external API is unreachable, a built-in heuristic rule engine immediately provides realistic sample analysis.
- **Built-in Rate Limiting**: In-memory sliding-window rate limiting prevents abuse, denial of service, and excessive API billing.

---

## 🔍 How It Works

1. **User Submission**: The user pastes a suspicious message and selects the channel (SMS, WhatsApp, Email, or Not sure).
2. **Rate Limiting & Input Validation**: The server validates payload length (min 5, max 5,000 characters) and enforces IP rate limits.
3. **Structured Server-Side AI Evaluation**:
   - The message is sent to Google Gemini (or OpenAI) using a strict system instruction.
   - The AI responds with structured JSON adhering to ScamSignal's Zod schema.
4. **Validation & Neutralization**:
   - The server validates the AI response against `aiResponseSchema`.
   - All URLs are extracted, deduplicated, and defanged (`hxxps[://]domain[.]com`).
5. **Results Display**:
   - **Assessment & Risk Level**
   - **Warning Signs & Exact Quoted Evidence**
   - **What to Do Next (Safe Next Steps)**
   - **Uncertainty & Technical Context Limitations**

---

## 🔒 Security & Privacy Safeguards

- **No Data Retention**: Messages are evaluated purely in memory. No database is connected.
- **No Secret Leakage**: API keys (`GEMINI_API_KEY`, `OPENAI_API_KEY`) remain strictly on the server and are never exposed to client-side bundles.
- **No Direct Link Following**: ScamSignal does not send crawlers or HTTP requests to URLs found in messages.
- **Defensive Guidance Only**: ScamSignal will never suggest sending money, providing OTPs, or clicking links.
- **Security Headers**: Configured with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 💻 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **AI Integrations**: Google Gemini REST API / OpenAI API / Local Heuristics

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node 22)
- npm, pnpm, or yarn

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd ScamSignal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a local `.env.local` file by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to add your AI API key (or leave empty to use built-in **Demo Mode**):
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   # or
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`. The table below outlines each variable:

| Variable | Required? | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Optional* | None | Google Gemini API key ([Get a key](https://aistudio.google.com/app/apikey)) |
| `OPENAI_API_KEY` | Optional* | None | OpenAI API key ([Get a key](https://platform.openai.com/api-keys)) |
| `OPENAI_BASE_URL` | Optional | `https://api.openai.com/v1` | Custom endpoint for OpenAI-compatible proxies (Groq, Ollama, etc.) |
| `AI_PROVIDER` | Optional | Auto-detected | Preferred provider (`gemini` or `openai`) |
| `DEMO_MODE` | Optional | `false` | When `true`, forces local heuristic rule engine |
| `RATE_LIMIT_MAX_REQUESTS` | Optional | `10` | Max requests allowed per IP window |
| `RATE_LIMIT_WINDOW_SECONDS` | Optional | `60` | Duration of rate limiting window in seconds |
| `NEXT_PUBLIC_APP_URL` | Recommended | `https://scamsignal.vercel.app` | Base URL used for OpenGraph tags and XML sitemaps |

*\*If neither key is provided, ScamSignal automatically operates in **Demo Mode**, utilizing its local heuristic rule engine with a clear informational notice.*

---

## 🧪 Testing

ScamSignal includes a 20-test test suite covering input validation, malformed AI responses, risk scoring heuristics, and prompt-injection defenses.

Run the test suite:
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

---

## 📦 Step 1: Publish to a Public GitHub Repository

Follow these steps to publish your code to GitHub:

1. **Initialize git (if not already done)**:
   ```bash
   cd /Users/himanshuchaurasiya/Desktop/ScamSignal
   git init
   git add .
   git commit -m "Initial commit: ScamSignal web app"
   ```

2. **Create a new public repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Enter Repository Name: `ScamSignal`.
   - Set visibility to **Public**.
   - Do **NOT** initialize with a README, .gitignore, or license (these already exist in your project).
   - Click **Create repository**.

3. **Link your local repository and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/ScamSignal.git
   git push -u origin main
   ```

> **Security Note**: The `.gitignore` file automatically excludes `.env`, `.env.local`, and API keys. Never remove `.env*.local` from `.gitignore`.

---

## ☁️ Step 2: Deploy to Vercel & Configure AI Keys

Vercel is the recommended, zero-configuration hosting platform for Next.js applications:

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.

2. **Import the Project**:
   - Click **Add New...** > **Project**.
   - Locate your `ScamSignal` repository and click **Import**.

3. **Configure Environment Variables**:
   In the **Environment Variables** section on the Vercel setup screen, add:
   - **`GEMINI_API_KEY`**: Paste your Google Gemini API key (or `OPENAI_API_KEY`).
   - **`NEXT_PUBLIC_APP_URL`**: Your deployment domain (e.g. `https://scamsignal.vercel.app`).
   - *(Optional)* `RATE_LIMIT_MAX_REQUESTS`: `15`

4. **Click Deploy**:
   - Vercel will automatically build the Next.js project and provide you with a live, public HTTPS URL (e.g., `https://scamsignal.vercel.app`).

5. **Updating Environment Variables in Future**:
   - If you ever need to rotate or add an API key later:
     - Navigate to your project on Vercel > **Settings** > **Environment Variables**.
     - Add or update the variable and trigger a redeployment.

---

## 🔎 Step 3: Google Search Console & SEO Readiness

ScamSignal is pre-configured with SEO best practices:
- **`robots.txt`**: Served at `/robots.txt` (allows public pages `/`, `/about`, `/privacy`, `/limitations`; blocks private `/api/`).
- **`sitemap.xml`**: Dynamically generated at `/sitemap.xml` with last-modified timestamps.
- **OpenGraph & Twitter Cards**: High-resolution metadata for social sharing.
- **JSON-LD Schema**: Structured `WebApplication` metadata embedded in the document head.
- **Static Semantic Markup**: Public pages render meaningful HTML server-side for search engine crawlers.

### Steps to Submit to Google Search Console:

1. **Open Google Search Console**:
   - Visit [search.google.com/search-console](https://search.google.com/search-console).

2. **Add Your Deployed Website**:
   - Click **Add Property**.
   - Choose **URL prefix** and enter your live public URL (e.g. `https://scamsignal.vercel.app`).
   - Click **Continue**.

3. **Verify Ownership**:
   - Recommended: Choose **HTML tag** method.
   - Copy the verification code provided by Google (e.g., `<meta name="google-site-verification" content="..." />`).
   - Add this tag to `app/layout.tsx` or enter the code in Vercel settings, and click **Verify**.

4. **Submit Your Sitemap**:
   - In the left sidebar of Search Console, click **Sitemaps**.
   - Under *Add a new sitemap*, type `sitemap.xml`.
   - Click **Submit**.

> **Important Note on Google Indexing**:
> Submitting your sitemap makes your website eligible to be indexed, but Google determines when and whether to crawl, index, and rank individual pages. Indexing is an autonomous process managed by Google's search algorithms and typically takes anywhere from several days to a few weeks. No web application can promise or guarantee immediate ranking.

---

## ⚠️ Important Limitations & Disclaimers

1. **Educational & Informational Tool Only**: ScamSignal does not guarantee scam detection and is not a cyber-insurance or legal warranty.
2. **False Positives & False Negatives**:
   - Clean, polite phishing emails or compromised real accounts may not display obvious keywords.
   - Genuine urgent notifications (e.g. medical appointments or genuine bank fraud alerts) may trigger warnings due to urgency words.
3. **Sender Spoofing**: Text messages and email display names can be forged at the carrier or SMTP level. ScamSignal evaluates message content; it cannot authenticate carrier network routing.
4. **Emergency Rule**: If you suspect you have disclosed passwords, banking PINs, or sent money to a scammer:
   - Contact your bank's fraud department immediately using the phone number on your card.
   - Report the incident to the FTC at [ReportFraud.ftc.gov](https://reportfraud.ftc.gov) or your national cybercrime agency.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
