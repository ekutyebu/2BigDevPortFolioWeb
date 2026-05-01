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
  const imgs = ["1517694712202-14dd9538aa97", "1504384308090-c894fdcc538d", "1461749280684-dccba630e2f6", "1518770660439-4636190af475", "1550751827-4bd374c3f58b", "1451187580459-43490279c0fa", "1519389950473-47ba0277781c", "1581091226825-a6a2a5aee158"];

  const posts = [
    {
      title: "The Impact of 5G on Web Development",
      slug: "impact-of-5g-on-web-development",
      content: `
        <p><strong>5G isn't just faster internet — it's a complete shift in what web applications can do.</strong></p>
        <h3>What Changes with 5G</h3>
        <table border="1" style="width:100%; border-collapse: collapse; margin: 15px 0; font-size: 14px;">
          <tr style="background: #f8fafc;"><th>Aspect</th><th>Before 5G (4G/LTE)</th><th>With 5G</th></tr>
          <tr><td>Latency</td><td>30-50ms</td><td>1-4ms</td></tr>
          <tr><td>Bandwidth</td><td>100Mbps</td><td>10Gbps</td></tr>
          <tr><td>Device density</td><td>2,000 devices/km²</td><td>1,000,000 devices/km²</td></tr>
          <tr><td>Reliability</td><td>99.9%</td><td>99.999%</td></tr>
        </table>
        <h3>Real Changes for Web Development</h3>
        <p><strong>1. Streaming high-quality video becomes standard</strong><br/>4K/8K video without buffering. Real-time AR/VR experiences in the browser. No more "optimizing" everything to death.</p>
        <p><strong>2. Edge computing becomes the default</strong><br/>Compute moves closer to users. Serverless functions at the edge (<10ms response). Your API can live in 50+ locations simultaneously.</p>
        <p><strong>3. Real-time collaboration everywhere</strong><br/>Latency low enough for musical collaboration. Real-time design tools with zero perceptible lag. Multi-user gaming in the browser.</p>
        <h3>What This Means for You</h3>
        <p>New constraints appear: Battery life becomes the bottleneck. Data costs matter. Security complexity increases.</p>
        <h3>Step-by-Step Optimization</h3>
        <p><strong>Step 1: Measure current performance</strong></p>
        <pre><code>npm install -g lighthouse\nlighthouse https://yoursite.com --view</code></pre>
        <p><strong>Step 2: Implement adaptive bitrate streaming</strong></p>
        <pre><code>const useAdaptiveQuality = () => {\n  const connection = navigator.connection?.effectiveType;\n  if (connection === '4g') return 'high';\n  if (connection === '3g') return 'medium';\n  return 'low';\n};</code></pre>
        <h3>Resources</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Resource</th><th>Why Read It</th></tr>
          <tr><td><a href="https://web.dev/adaptive-serving-based-on-network-quality/">Web.dev</a></td><td>Official Google guide on network-aware delivery</td></tr>
          <tr><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API">MDN: WebRTC API</a></td><td>Complete WebRTC documentation</td></tr>
        </table>
      `,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "How to Secure Your Database in 5 Steps",
      slug: "secure-your-database-in-5-steps",
      content: `
        <p>The #1 threat to databases in 2026 isn't SQL injection — it's <strong>credential stuffing</strong>.</p>
        <h3>Step 1: Stop Credential Stuffing</h3>
        <pre><code>ALTER TABLE users ADD COLUMN login_attempts INT DEFAULT 0;\nALTER TABLE users ADD COLUMN last_login_attempt TIMESTAMP;\nALTER TABLE users ADD COLUMN locked_until TIMESTAMP;</code></pre>
        <p>Implement rate limiting logic:</p>
        <pre><code>if (user.loginAttempts >= 5 && user.lastLoginAttempt > new Date(Date.now() - 15 * 60 * 1000)) {\n  await db.user.update({ where: { email }, data: { lockedUntil: new Date(Date.now() + 30 * 60 * 1000) } });\n}</code></pre>
        <h3>Step 2: Password Hashing</h3>
        <pre><code>import bcrypt from 'bcrypt';\nconst hashedPassword = await bcrypt.hash(password, 12);\nconst isValid = await bcrypt.compare(inputPassword, storedHash);</code></pre>
        <h3>Step 5: Encrypt Sensitive Data</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Data Type</th><th>Recommended Protection</th></tr>
          <tr><td>Passwords</td><td>bcrypt (12 rounds)</td></tr>
          <tr><td>PII</td><td>AES-256 encryption at rest</td></tr>
          <tr><td>Payment info</td><td>Tokenization (Stripe)</td></tr>
        </table>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://owasp.org/Top10">OWASP Top 10</a></li>
          <li><a href="https://auth0.com/blog/hashing-passwords-in-right-way">Bcrypt Best Practices</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Role of UX Design in Software Engineering",
      slug: "role-of-ux-design-in-engineering",
      content: `
        <p>UX isn't "make it pretty" — it's <strong>"make it work for humans."</strong></p>
        <h3>Business Reality</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Metric</th><th>Poor UX</th><th>Good UX</th></tr>
          <tr><td>User retention</td><td>&lt;20% after day 1</td><td>40-60% after day 1</td></tr>
          <tr><td>Conversion</td><td>1-3%</td><td>5-15%</td></tr>
        </table>
        <h3>Component-Driven Prototyping</h3>
        <p>Build prototypes using reusable, code-backed UI components instead of static screens.</p>
        <pre><code>npx storybook@latest init</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://maze.co">Maze Usability Testing</a></li>
          <li><a href="https://www.uxpin.com/merge">UXPin Merge</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Handling State in Modern React Applications",
      slug: "handling-state-in-react-2026",
      content: `
        <p>Choose the right tool for the job. Use Zustand for lightweight global state and React Query for server cache.</p>
        <h3>Decision Matrix</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Scenario</th><th>Best Tool</th></tr>
          <tr><td>Local UI state</td><td>useState</td></tr>
          <tr><td>Server cache</td><td>React Query</td></tr>
          <tr><td>Global app state</td><td>Zustand</td></tr>
        </table>
        <h3>Zustand Example</h3>
        <pre><code>import { create } from 'zustand';\nexport const useCounterStore = create()((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why I Am Betting on Rust for Backend Performance",
      slug: "why-rust-for-backend-performance",
      content: `
        <p>Rust implementations are consistently 1.5x to 32x faster than other languages.</p>
        <h3>Benchmark Data</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Language</th><th>Relative Performance</th></tr>
          <tr><td>Rust</td><td>1.5x faster (baseline)</td></tr>
          <tr><td>Go</td><td>2.1x slower</td></tr>
          <tr><td>TypeScript</td><td>10.7x slower</td></tr>
          <tr><td>Python</td><td>13.4x slower</td></tr>
        </table>
        <h3>Get Started in 1 Hour</h3>
        <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\ncargo new my-api\ncd my-api\ncargo run</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Serverless vs Containers: Ultimate Comparison",
      slug: "serverless-vs-containers-2026",
      content: `
        <p>AI agent workloads in 2026 are emerging as <strong>micro-VMs</strong>.</p>
        <h3>Quick Decision Matrix</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Your Workload</th><th>Best Choice</th></tr>
          <tr><td>Burst traffic</td><td>Serverless</td></tr>
          <tr><td>Long-running</td><td>Containers</td></tr>
          <tr><td>Untrusted code</td><td>Micro-VMs</td></tr>
        </table>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://fly.io/docs/machines/">Fly.io Machines (Micro-VMs)</a></li>
          <li><a href="https://vercel.com/docs/functions">Vercel Functions</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Mastering Tailwind CSS for Rapid Prototyping",
      slug: "mastering-tailwind-css-2026",
      content: `
        <p>Utility-first CSS prioritizes small, single-purpose classes applied directly to HTML elements.</p>
        <h3>Step-by-Step</h3>
        <p>Step 1: Automatic class sorting</p>
        <pre><code>npm install -D prettier prettier-plugin-tailwindcss</code></pre>
        <p>Step 2: Use design tokens</p>
        <pre><code>&lt;div class="p-8 text-primary"&gt;</code></pre>
        <h3>Resources</h3>
        <ul>
          <li><a href="https://tailwindcss.com/docs">Tailwind Docs</a></li>
          <li><a href="https://tailwindui.com">Tailwind UI</a></li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Power of TypeScript in Large-Scale Apps",
      slug: "typescript-in-large-scale-apps",
      content: `
        <p>At scale, barrel files are the disaster that slows down your builds by 75%.</p>
        <h3>Optimized tsconfig.json</h3>
        <pre><code>{\n  "compilerOptions": {\n    "incremental": true,\n    "skipLibCheck": true,\n    "isolatedModules": true,\n    "types": []\n  }\n}</code></pre>
        <h3>Diagnostics</h3>
        <pre><code>tsc --extendedDiagnostics\ntsc --explainFiles > explain.txt</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1550741164-c6f2d70ff22b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Next.js vs Remix vs Astro: 2026 Comparison",
      slug: "nextjs-remix-astro-comparison",
      content: `
        <p>Next.js is the giant, Remix (React Router v7) is the standard, and Astro is the performance king.</p>
        <table border="1" style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;"><th>Metric</th><th>Next.js</th><th>Astro</th></tr>
          <tr><td>Client JS</td><td>85-100KB</td><td>0KB</td></tr>
          <tr><td>Lighthouse</td><td>85-95</td><td>95-100</td></tr>
        </table>
        <p>A 'hello world' page in Next.js is ~85KB gzipped — significantly more than Astro's zero.</p>
      `,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "How to Explain Tech to a Non-Technical CEO",
      slug: "explain-tech-to-ceo",
      content: `
        <p>CEOs care about cost, speed, risk, and revenue. Translate tech debt to "This slows down future features."</p>
        <h3>The 3-Minute Explanation</h3>
        <p>Step 1: Start with the business problem.<br/>Step 2: Explain the solution in one sentence.<br/>Step 3: Connect timeline to outcomes.</p>
      `,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Future of Web Development: Predictions",
      slug: "future-of-web-development",
      content: `
        <p>AI will be embedded in every workflow. Hyper-personalized experiences will become standard.</p>
        <p>Performance will be a competitive advantage, not a 'nice-to-have'. Websites will become conversational and intelligent.</p>
      `,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Mental Health for Engineers: Burnout is Real",
      slug: "mental-health-for-engineers",
      content: `
        <p>Burnout Warning Signs: Cynicism, detachment, exhaustion, brain fog.</p>
        <h3>Immediate Actions</h3>
        <ol>
          <li>Say "no" to new work.</li>
          <li>Log off 30 minutes earlier.</li>
          <li>Tell your manager exactly what's wrong.</li>
        </ol>
      `,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Rise of Low-Code for Internal Tools",
      slug: "low-code-internal-tools",
      content: `
        <p>Retool is perfect for admin panels. Use code for consumer-facing features, use low-code for internal dashboards.</p>
        <h3>Hybrid Approach</h3>
        <p>✅ Code: Auth, Payments.<br/>✅ Low-code: Admin dashboard, reporting.</p>
      `,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why You Need a Portfolio Even with a Great CV",
      slug: "portfolio-vs-cv-2026",
      content: `
        <p>A CV tells. A portfolio shows. Live Demo > Screenshots > Description.</p>
        <h3>The 3-Portfolio Rule</h3>
        <ul>
          <li>Work portfolio (3 best projects).</li>
          <li>Passion portfolio (2 side projects).</li>
          <li>Open-source contributions.</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Lessons from Scaling a Python NLP Tool",
      slug: "scaling-python-nlp",
      content: `
        <p>Data quality > model sophistication. Preprocessing is 80% of the work.</p>
        <pre><code>from textblob import TextBlob\nblob = TextBlob("I hate this product")\nprint(blob.sentiment.polarity)</code></pre>
        <h3>Real Lessons</h3>
        <p>Deployment is harder than training. Version your models and log confidence scores.</p>
      `,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Generative AI in E-commerce: Boosting Conversions",
      slug: "ai-in-ecommerce-conversions",
      content: `
        <p>Smart search and personalized recommendations are the easy wins. Avoid fake product images or fully automated pricing.</p>
        <pre><code>const metaDescription = await generateDescription({\n  productName: 'Running Shoes',\n  brand: 'Nike'\n});</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Importance of Unit Testing",
      slug: "unit-testing-importance",
      content: `
        <p>Test behavior, not implementation. Business logic and Auth are high priority.</p>
        <pre><code>test('clicking submit saves input', async () => {\n  render(&lt;Form /&gt;);\n  await userEvent.click(screen.getByRole('button'));\n  expect(screen.getByText(/saved/i)).toBeInTheDocument();\n});</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Managing Technical Debt Without Losing Your Mind",
      slug: "manage-technical-debt",
      content: `
        <p>Technical debt is optimized for the past, not the present.</p>
        <h3>Refactoring Flow</h3>
        <p>1. Identify high-interest debt.<br/>2. Write a test for what it should do.<br/>3. Refactor.<br/>4. Run test.</p>
      `,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Micro-Frontends: Are They Still Relevant?",
      slug: "micro-frontends-2026",
      content: `
        <p>Only for 16+ developer teams. Try Monorepos (Nx) or Modular Monoliths first.</p>
        <p>獨立部署是關鍵。如果你每週部署超過一次，MFE才有價值。</p>
      `,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "React Native vs Flutter: Mobile Battle",
      slug: "react-native-vs-flutter-2026",
      content: `
        <p>React Native for React devs, Flutter for maximum performance and animations.</p>
        <pre><code>npx react-native init MyApp\nnpx react-native run-android</code></pre>
        <p>Expo is the even easier path to production.</p>
      `,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why Your Images Slow Your Lighthouse Score",
      slug: "optimize-images-lighthouse",
      content: `
        <p>Use Next.js <code>Image</code> component and AVIF formats. Lazy load by default.</p>
        <pre><code>&lt;Image src="/img.jpg" width={800} height={600} /&gt;</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Hidden Dangers of JWT Authentication",
      slug: "jwt-authentication-dangers",
      content: `
        <p>Avoid <code>localStorage</code> (XSS risk). Use <code>httpOnly</code> cookies. Rotate secrets regularly.</p>
        <pre><code>res.cookie('accessToken', token, { httpOnly: true, secure: true });</code></pre>
      `,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: { ...post, published: true } });
  }

  console.log('Seeded 22 full-unabridged masterclass posts successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
