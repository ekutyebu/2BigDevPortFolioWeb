# 🚀 2BigDev Portfolio Template

A fully functional, production-ready portfolio website built with the latest Next.js features, optimized for SEO, and packed with automation.

## ✨ Features

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: PostgreSQL with Prisma ORM.
- **Email Automation**: 
  - Contact form submissions saved to DB.
  - Instant email notification to you (Resend).
  - Professional auto-reply to the sender.
- **Live Chat**: 100% free Tawk.to integration.
- **SEO Optimized**: 
  - Dynamic Sitemap & Robots.txt.
  - JSON-LD Structured Data.
  - Open Graph & Twitter Cards.
  - 100/100 Lighthouse-ready performance.
- **Premium Design**: Dark/Light mode, glassmorphism, smooth animations.

## 🛠️ Getting Started

### 1. Clone & Install
```bash
# Since the environment setup had issues, please run:
npm install
```

### 2. Database Setup
1. Create a PostgreSQL database (e.g., on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com)).
2. Copy `.env.example` to `.env`.
3. Add your `DATABASE_URL`.
4. Run migrations:
```bash
npx prisma db push
```

### 3. Email Automation (Resend)
1. Create an account at [resend.com](https://resend.com).
2. Get your API Key and add it to `RESEND_API_KEY` in `.env`.
3. Add your receiving email to `CONTACT_EMAIL`.

### 4. Live Chat (Tawk.to)
1. Sign up at [tawk.to](https://www.tawk.to/).
2. In the dashboard, go to **Admin > Chat Widget**.
3. Copy the **Property ID** and **Widget ID** and add them to `.env`.

### 5. Run Locally
```bash
npm run dev
```

## 🚀 Deployment (Vercel)

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add all environment variables from your `.env` file to the Vercel project settings.
4. Deploy!

## 📈 SEO & Backlinks
Check [SEO_STRATEGY.md](./SEO_STRATEGY.md) for a detailed breakdown of the built-in SEO and backlink acquisition strategy.

## 📄 License
MIT
