const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Global Data...');

  // 1. Clear existing data
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.post.deleteMany({});

  // 2. Add 6 Projects
  const projects = [
    {
      title: "OmniChannel Marketplace Engine",
      description: "A world-class multi-vendor engine built with Next.js 14, featuring real-time global syncing and high-concurrency handling.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Redis"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 1
    },
    {
      title: "Autonomous AI Agent Suite",
      description: "Custom-built NLP agents leveraging OpenAI and Python for automated industry analysis and content scaling.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
      tags: ["Python", "OpenAI", "LangChain", "FastAPI"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 2
    },
    {
      title: "Edge-Optimized Analytics",
      description: "A high-performance dashboard for monitoring real-time user behavior at the network edge with zero latency.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      tags: ["TypeScript", "Vercel Edge", "Chart.js"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 3
    },
    {
      title: "Secure FinTech Gateway",
      description: "A secure, PCI-compliant payment gateway integration for global currencies and crypto-assets.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1000",
      tags: ["Node.js", "Stripe API", "Security", "Web3"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 4
    },
    {
      title: "Enterprise Cloud ERP",
      description: "Scalable resource planning system for manufacturing and logistics with Debian-hardened security.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Express", "Debian", "Docker"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 5
    },
    {
      title: "Social Graph Protocol",
      description: "A decentralized social networking protocol focusing on user data ownership and graph-based relationships.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
      tags: ["GraphQL", "Neo4j", "Next.js", "Web3"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 6
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // 3. Add Skills
  const skills = [
    { name: "Next.js 14 / React", category: "Frontend", level: 95 },
    { name: "React Native", category: "Mobile", level: 85 },
    { name: "Node.js Architecture", category: "Backend", level: 90 },
    { name: "Python AI / FastAPI", category: "Backend", level: 88 },
    { name: "Generative AI / LLMs", category: "AI", level: 85 },
    { name: "PostgreSQL / Redis", category: "Infrastructure", level: 90 },
    { name: "Debian / Linux Admin", category: "Infrastructure", level: 85 },
    { name: "Docker / AWS / Vercel", category: "DevOps", level: 82 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // 4. Add Global Blog Posts
  const posts = [
    {
      title: "The 2026 Tech Stack: Why Next.js and Rust are Dominating the Enterprise",
      slug: "tech-stack-2026-enterprise",
      content: `
        <p>The era of the "Simple Website" is dead. In 2026, the biggest companies in the world—from Google to X—are shifting toward highly-optimized, edge-first architectures.</p>
        <h2>The Rise of Edge Computing</h2>
        <p>By moving logic closer to the user, we reduce latency and improve security. <strong>Next.js 14</strong>, when combined with high-performance backends like <strong>Rust</strong> or <strong>Node.js</strong>, creates a virtually unbreakable infrastructure.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Debian vs. Windows: Architecting the Ultimate Dev Environment",
      slug: "debian-vs-windows-dev-environment",
      content: `
        <p>Every world-class engineer knows that your OS is your workshop. While Windows is the king of productivity, <strong>Debian Linux</strong> remains the gold standard for server stability.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "The Silent Killer of Vercel Apps: Fixing 'Connection Terminated Unexpectedly'",
      slug: "fix-prisma-connection-terminated-vercel",
      content: `
        <p>Let's be honest: nothing kills a launch day like seeing a random 500 error in your Vercel logs while your local machine works perfectly. If you're using <strong>Prisma</strong> and <strong>Neon</strong>, you've probably seen it: <em>"Connection terminated unexpectedly."</em></p>
        
        <h2>Why It Happens (The Honest Truth)</h2>
        <p>Most tutorials tell you to just copy the connection string and go. But in a serverless environment like Vercel, your "server" is actually hundreds of tiny functions waking up and falling asleep. Standard database connections weren't built for this "on-and-off" lifestyle.</p>
        
        <h2>The Step-by-Step Fix</h2>
        <p>After hours of debugging, here is the 100% stable solution that I use for all my global projects:</p>
        
        <h3>1. The "Lazy" Client Pattern</h3>
        <p>Don't initialize your database at the top of your file. Create a function that only wakes up the database when a request actually comes in. This prevents your app from crashing before it even starts.</p>
        
        <h3>2. Use the Pooler, but Clean it Up</h3>
        <p>Neon gives you a "Pooler" URL. Use it, but make sure to remove <code>&channel_binding=require</code> from the string. Prisma sometimes chokes on that extra security layer in a serverless environment.</p>
        
        <h3>3. The 'Direct' Secret</h3>
        <p>For your migrations and heavy seeding, always keep a <strong>DIRECT</strong> connection URL in your local <code>.env</code>. This bypasses the noise and gives you a straight line to your data.</p>
        
        <h2>Conclusion</h2>
        <p>Engineering isn't about avoiding bugs; it's about building systems that are resilient enough to handle them. Stay curious, stay honest, and keep shipping.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log('Global Seeding finished successfully with 6 projects!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
