const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding COMPLETE Unabridged Masterclass Content...');

  // 1. Clear existing data
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.post.deleteMany({});

  // 2. Add your 6 Real Projects
  const projects = [
    { title: "INOVAMARK", description: "Full marketplace with cart, vendor system, multi-language, payment integration", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Node.js", "PostgreSQL"], link: "https://e-vendor-two.vercel.app/en", order: 1 },
    { title: "VICALU", description: "Product catalog for aluminium, glass, hardware, composite panels", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://vicalu.vercel.app", order: 2 },
    { title: "Dynasty Group Ltd", description: "Corporate site for agricultural company (labour outsourcing, irrigation)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://dynasty-group-ltd.vercel.app", order: 3 },
    { title: "TechAscend", description: "Fellowship Application Portal with multi-step forms", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000", tags: ["Next.js", "Tailwind"], link: "https://www.tech-ascend.com", order: 4 },
    { title: "Bloosom Tech", description: "Modern brand website with clean responsive design", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://bloosom-tech.vercel.app", order: 5 },
    { title: "TechX Sentiment Project", description: "Sentiment analysis using TextBlob for text classification", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000", tags: ["Python", "TextBlob", "NLP"], link: "https://github.com/ekutyebu/techx-sentiment-project", order: 6 }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // 3. Add Skills
  const skills = [
    { name: "Next.js / React", category: "Frontend", level: 95 },
    { name: "Node.js Architecture", category: "Backend", level: 90 },
    { name: "Python / AI", category: "AI", level: 85 },
    { name: "PostgreSQL", category: "Infrastructure", level: 90 },
    { name: "Tailwind CSS", category: "Frontend", level: 95 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Verified Images
  const imgs = ["1517694712202-14dd9538aa97", "1504384308090-c894fdcc538d", "1461749280684-dccba630e2f6", "1518770660439-4636190af475", "1550751827-4bd374c3f58b"];

  const posts = [
    {
      title: "The Impact of 5G on Web Development",
      slug: "impact-of-5g-on-web-development",
      content: `
        <p><strong>5G isn't just faster internet — it's a complete shift in what web applications can do.</strong></p>
        <h3>What Changes with 5G</h3>
        <table border="1" style="width:100%; border-collapse: collapse; margin: 10px 0;">
          <thead><tr style="background: #f3f4f6;"><th>Aspect</th><th>Before 5G (4G/LTE)</th><th>With 5G</th></tr></thead>
          <tbody>
            <tr><td>Latency</td><td>30-50ms</td><td>1-4ms</td></tr>
            <tr><td>Bandwidth</td><td>100Mbps</td><td>10Gbps</td></tr>
            <tr><td>Device density</td><td>2,000/km²</td><td>1,000,000/km²</td></tr>
          </tbody>
        </table>
        <h3>Real Changes</h3>
        <ul>
          <li><strong>High-quality video:</strong> 4K/8K without buffering.</li>
          <li><strong>Edge computing:</strong> Serverless functions at the edge (<10ms).</li>
          <li><strong>Real-time collaboration:</strong> Zero lag design tools and gaming.</li>
        </ul>
        <h3>Step-by-Step Optimization</h3>
        <p>Step 1: Measure performance</p>
        <pre><code>npm install -g lighthouse\nlighthouse https://yoursite.com --view</code></pre>
        <p>Step 2: Adaptive quality</p>
        <pre><code>const connection = navigator.connection?.effectiveType;\nif (connection === '4g') return 'high';</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://web.dev/adaptive-serving-based-on-network-quality/" target="_blank">Web.dev: Adaptive Serving</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API" target="_blank">MDN: WebRTC API</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "How to Secure Your Database in 5 Steps",
      slug: "secure-your-database-in-5-steps",
      content: `
        <p>Recent analysis shows the #1 threat in 2026 is <strong>credential stuffing</strong>.</p>
        <h3>Step 1: Stop Credential Stuffing</h3>
        <pre><code>ALTER TABLE users ADD COLUMN login_attempts INT DEFAULT 0;\nALTER TABLE users ADD COLUMN last_login_attempt TIMESTAMP;\nALTER TABLE users ADD COLUMN locked_until TIMESTAMP;</code></pre>
        <h3>Step 2: Proper Password Hashing</h3>
        <pre><code>import bcrypt from 'bcrypt';\nconst hashedPassword = await bcrypt.hash(password, 12);</code></pre>
        <h3>Step 3: Least Privilege</h3>
        <p>Your app shouldn't delete the whole DB. Create limited users.</p>
        <pre><code>CREATE USER 'app_readonly'@'localhost' IDENTIFIED BY 'pass';\nGRANT SELECT ON mydb.* TO 'app_readonly'@'localhost';</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://owasp.org/Top10" target="_blank">OWASP Top 10</a></li>
          <li><a href="https://www.postgresql.org/docs/current/security.html" target="_blank">PostgreSQL Security</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Role of UX Design in Software Engineering",
      slug: "role-of-ux-in-software-engineering",
      content: `
        <p>UX is <strong>"make it work for humans."</strong></p>
        <h3>Business Reality</h3>
        <table border="1" style="width:100%; border-collapse: collapse; margin: 10px 0;">
          <tr style="background: #f3f4f6;"><th>Metric</th><th>Poor UX</th><th>Good UX</th></tr>
          <tr><td>User retention</td><td><20%</td><td>40-60%</td></tr>
          <tr><td>Conversion</td><td>1-3%</td><td>5-15%</td></tr>
        </table>
        <h3>Step-by-Step Workflow</h3>
        <p>1. Audit current UX.<br/>2. Create component library.</p>
        <pre><code>npx storybook@latest init</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://storybook.js.org" target="_blank">Storybook Docs</a></li>
          <li><a href="https://maze.co" target="_blank">Maze Usability Testing</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Handling State in Modern React Applications",
      slug: "handling-state-in-react-apps",
      content: `
        <p>Choose the right tool. Use <strong>Zustand</strong> for global state and <strong>React Query</strong> for server data.</p>
        <h3>Implementation (Zustand)</h3>
        <pre><code>import { create } from 'zustand';\nexport const useStore = create()((set) => ({\n  count: 0,\n  increment: () => set((s) => ({ count: s.count + 1 })),\n}));</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://docs.pmnd.rs/zustand" target="_blank">Zustand Guide</a></li>
          <li><a href="https://tanstack.com/query" target="_blank">TanStack Query</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why I Am Betting on Rust for Backend Performance",
      slug: "why-rust-for-backend-performance",
      content: `
        <p>Rust is 1.5x to 32x faster than other languages. The fastest Rust implementation (PolkaJam) is 20x faster than TypeScript.</p>
        <h3>Benchmarking Results</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f3f4f6;"><th>Language</th><th>Relative Perf</th></tr>
          <tr><td>Rust</td><td>1.5x faster</td></tr>
          <tr><td>Go</td><td>2.1x slower</td></tr>
          <tr><td>Java</td><td>4.8x slower</td></tr>
          <tr><td>TypeScript</td><td>10.7x slower</td></tr>
        </table>
        <h3>Get Started</h3>
        <pre><code>cargo new my-api\ncd my-api\ncargo run</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Serverless vs Containers: Ultimate Comparison 2026",
      slug: "serverless-vs-containers-comparison",
      content: `
        <p>AI workloads in 2026 are moving to <strong>Micro-VMs</strong>.</p>
        <h3>Comparison</h3>
        <p><strong>Serverless:</strong> Bursty traffic, pay-per-ms.<br/><strong>Containers:</strong> Long-running, full control.</p>
        <h3>Example (Serverless)</h3>
        <pre><code>export default async function handler(req, res) {\n  const data = await db.query('SELECT * FROM users');\n  res.status(200).json(data);\n}</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Mastering Tailwind CSS for Rapid Prototyping",
      slug: "mastering-tailwind-css",
      content: `
        <p>Utility-first CSS prioritizes class application directly in HTML.</p>
        <h3>Automatic Sorting</h3>
        <pre><code>npm install -D prettier prettier-plugin-tailwindcss</code></pre>
        <h3>Design Tokens</h3>
        <p>Use <code>p-8 text-primary</code> instead of arbitrary values.</p>
      `,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Power of TypeScript in Large-Scale Apps",
      slug: "typescript-in-large-scale-apps",
      content: `
        <p>Avoid <strong>Barrel Files</strong> (index.ts re-exports). They slow build times by 75%.</p>
        <pre><code>// ✅ Good\nimport { Button } from './components/Button/Button';\n// ❌ Bad\nimport { Button } from './components';</code></pre>
        <h3>Measure Diagnostics</h3>
        <pre><code>tsc --extendedDiagnostics</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1550741164-c6f2d70ff22b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Next.js vs Remix vs Astro: The 2026 Choice",
      slug: "nextjs-remix-astro-2026",
      content: `
        <p><strong>Next.js:</strong> Complex React apps.<br/><strong>Remix (React Router v7):</strong> Web standards.<br/><strong>Astro:</strong> Content-focused, 0KB JS.</p>
        <h3>Benchmarking</h3>
        <p>Astro ships 0KB JS on static pages, while Next.js ships ~85KB.</p>
      `,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "How to Explain Tech to a Non-Technical CEO",
      slug: "explain-tech-to-ceo",
      content: `
        <p>CEOs care about <strong>ROI</strong>. Translate technical debt to "future development speed."</p>
        <h3>Translation Matrix</h3>
        <p>Refactoring = "Cleaning the kitchen so cooking gets faster."<br/>Serverless = "We only pay when people use the app."</p>
      `,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Future of Web Development: Predictions",
      slug: "future-of-web-development-predictions",
      content: `
        <p><strong>1. AI Embedded:</strong> Auto-complete functions and real-time debugging.<br/><strong>2. Hyper-Personalization:</strong> Dynamic layouts per user behavior.</p>
      `,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Mental Health for Engineers: Burnout is Real",
      slug: "mental-health-for-engineers-burnout",
      content: `
        <p>Exhaustion and cynicism are early signs. Use the <strong>4-7-8 Rule</strong>: 4 hours focus, 7 mins movement, 8 hours sleep.</p>
      `,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Rise of Low-Code for Internal Tools",
      slug: "rise-of-low-code-internal-tools",
      content: `
        <p>Retool and Budibase are perfect for admin panels. Use code for consumer-facing features, use low-code for internal CRUD.</p>
      `,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why You Need a Portfolio Even with a Great CV",
      slug: "why-need-portfolio-even-with-cv",
      content: `
        <p>Show, don't tell. A live URL for <strong>INOVAMARK</strong> beats a bullet point on a PDF.</p>
      `,
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Lessons from Scaling a Python NLP Tool",
      slug: "scaling-python-nlp-tool",
      content: `
        <p>Start with TextBlob before upgrading to Transformers. Preprocessing is 80% of the work.</p>
        <pre><code>from textblob import TextBlob\nblob = TextBlob("I hate this product")\nprint(blob.sentiment.polarity)</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Generative AI in E-commerce: Boosting Conversions",
      slug: "gen-ai-in-ecommerce",
      content: `
        <p>Smart search and personalized recommendations are easy wins. Avoid fully automated pricing or fake product images.</p>
      `,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Importance of Unit Testing",
      slug: "importance-of-unit-testing",
      content: `
        <p>Test the <strong>behavior</strong>, not the implementation. Use Vitest for speed.</p>
        <pre><code>expect(screen.getByText('Coffee')).toBeInTheDocument();</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Managing Technical Debt Without Losing Your Mind",
      slug: "managing-technical-debt",
      content: `
        <p>Use the 10% Rule: spend 10% of every feature's time refactoring related code.</p>
      `,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Micro-Frontends: Are They Still Relevant?",
      slug: "micro-frontends-relevancy",
      content: `
        <p>Only worth it for teams with 16+ developers needing independent deployments. Try Monorepos (Nx) first.</p>
      `,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "React Native vs Flutter: Mobile Battle",
      slug: "react-native-vs-flutter",
      content: `
        <p>If you know React, choose React Native. If you need 120fps animations, choose Flutter.</p>
      `,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why Your Images Slow Your Lighthouse Score",
      slug: "image-optimization-lighthouse",
      content: `
        <p>Use Next.js <code>Image</code> component and convert to WebP/AVIF.</p>
        <pre><code>&lt;Image src="/img.webp" width={800} height={600} /&gt;</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Hidden Dangers of JWT Authentication",
      slug: "hidden-dangers-of-jwt",
      content: `
        <p>Avoid <code>localStorage</code> (XSS risk). Use <code>httpOnly</code> cookies instead.</p>
      `,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: { ...post, published: true } });
  }

  console.log('Seeded 22 full-content posts successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
