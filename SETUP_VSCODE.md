# Atharv Portfolio — VS Code Setup & Backend Configuration

This guide explains how to run the portfolio locally in VS Code and configure the contact form for real email delivery.

## 1. Required software

Install:

- Node.js 20.9 or newer
- npm, pnpm, or another Node package manager
- VS Code
- Git (recommended)

Verify Node.js:

```bash
node --version
npm --version
```

## 2. Project dependencies

The project uses Next.js with React and JavaScript/JSX.

### Runtime dependencies already defined in `package.json`

- `next` — Next.js App Router framework
- `react` — React UI library
- `react-dom` — React DOM renderer
- `lucide-react` — UI icons
- `resend` — server-side email delivery
- `@vercel/analytics` — optional Vercel analytics
- `@base-ui/react` — UI primitives
- `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css` — styling utilities
- `shadcn` — component tooling

### Development dependencies

- `tailwindcss`
- `@tailwindcss/postcss`
- `postcss`
- `typescript` and React/Node type packages are retained by the Next.js scaffold, although the application source now uses JavaScript.

Install everything from the project root:

```bash
pnpm install
```

If pnpm is not installed:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

Do not install each dependency manually when `package.json` and `pnpm-lock.yaml` are available. The lockfile keeps versions consistent.

## 3. Run in VS Code

1. Open the project folder in VS Code.
2. Open the integrated terminal.
3. Install dependencies:

```bash
pnpm install
```

4. Create a local environment file:

```bash
cp .env.example .env.local
```

5. Add the environment variables described below.
6. Start the development server:

```bash
pnpm dev
```

7. Open `http://localhost:3000`.

Production verification:

```bash
pnpm build
pnpm start
```

## 4. Backend functionality currently implemented

The portfolio has one backend endpoint:

```text
POST /api/contact
```

File:

```text
app/api/contact/route.js
```

The endpoint:

- Parses the submitted JSON body.
- Validates name, email, and message length.
- Rejects the hidden honeypot field when it is filled.
- Sends the message through Resend.
- Uses the visitor's email as `replyTo`.
- Returns JSON status responses for success, validation failure, missing configuration, and provider failure.

No database is required for the current feature set. Messages are delivered directly to email and are not stored.

## 5. Environment variables

Create `.env.local` for local development and add the same values in Vercel Project Settings → Environment Variables for deployment:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_FROM_EMAIL=Portfolio Contact <contact@yourdomain.com>
CONTACT_TO_EMAIL=your-real-email@gmail.com
```

### Variable details

- `RESEND_API_KEY`: private Resend API key. Never expose it in client-side code or commit it to Git.
- `CONTACT_FROM_EMAIL`: sender address. The domain must be verified in Resend for production use.
- `CONTACT_TO_EMAIL`: inbox that receives portfolio messages.

Optional local fallback values exist in the route, but production should define all three variables explicitly.

## 6. Resend production setup

1. Create a Resend account.
2. Create an API key with the minimum permission needed to send email.
3. Add the domain you will use as `CONTACT_FROM_EMAIL`.
4. Add the DNS records Resend provides, normally SPF and DKIM records.
5. Wait for domain verification.
6. Use the verified sender address in `CONTACT_FROM_EMAIL`.
7. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` to the deployment environment.
8. Redeploy after changing deployment variables.

For local testing, Resend may allow `onboarding@resend.dev` as the sender, but a verified domain is required for a professional production setup.

## 7. Frontend values that must be replaced

Update `app/page.jsx` before publishing:

```js
const links = {
  github: 'https://github.com/your-username',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  resume: '/resume.pdf',
}
```

Also replace every placeholder email address:

```text
atharv@example.com
```

with the real contact email address.

Add the downloadable resume at:

```text
public/resume.pdf
```

Replace the featured project's `href: '#'` with the actual case study, repository, or deployed application URL.

## 8. Recommended backend hardening

The current endpoint is suitable for a small portfolio. Before exposing it to heavy traffic, add:

- Rate limiting by IP address and/or email address.
- Cloudflare Turnstile or another CAPTCHA for bot protection.
- Structured server-side logging without logging message contents or API keys.
- Error monitoring such as Sentry.
- A strict Content Security Policy after confirming all required external image/icon origins.
- Sanitized HTML email templates if HTML formatting is introduced.
- A database only if message history, an admin inbox, or analytics storage is required.

Do not put Resend credentials in `NEXT_PUBLIC_*` variables. Those variables are exposed to the browser.

## 9. Backend test checklist

With the dev server running:

1. Submit a valid form and confirm the email arrives at `CONTACT_TO_EMAIL`.
2. Confirm Reply works and targets the visitor's email.
3. Submit an invalid email and confirm the request is rejected.
4. Submit a message shorter than 10 characters and confirm validation appears.
5. Leave the honeypot empty; a filled honeypot should return a successful-looking response without sending email.
6. Temporarily remove `RESEND_API_KEY` and confirm the endpoint returns a configuration error.
7. Inspect the browser Network panel for `POST /api/contact` and confirm no secret is sent in the request.

## 10. Deployment checklist

- [ ] `pnpm install` completes successfully.
- [ ] `pnpm build` succeeds.
- [ ] Real GitHub and LinkedIn URLs are configured.
- [ ] `public/resume.pdf` exists.
- [ ] Resend domain is verified.
- [ ] Production environment variables are configured.
- [ ] Contact form successfully delivers a test email.
- [ ] No API keys are committed to Git.
- [ ] Custom domain and HTTPS are configured if applicable.

The application is a Next.js React project using JavaScript/JSX. The only required backend service for the currently implemented functionality is Resend; a database is not needed unless future requirements include storing submissions.
