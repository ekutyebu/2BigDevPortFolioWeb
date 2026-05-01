const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Global Data...');

  // 1. Clear existing data
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.post.deleteMany({});

  // 2. Add Projects
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
      description: "A high-performance dashboard for monitoring real-time user behavior at the network edge.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      tags: ["TypeScript", "Vercel Edge", "Chart.js"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 3
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // 3. Add Skills
  const skills = [
    { name: "Next.js / React", category: "Core", level: 95, icon: "Code2" },
    { name: "Node.js Architecture", category: "Backend", level: 90, icon: "Server" },
    { name: "Python AI / ML", category: "AI", level: 85, icon: "Cpu" },
    { name: "PostgreSQL / Redis", category: "Infrastructure", level: 90, icon: "Database" },
    { name: "Debian / Linux Admin", category: "Infrastructure", level: 85, icon: "Shield" },
    { name: "Cloud-Native (Vercel/AWS)", category: "DevOps", level: 80, icon: "Cloud" }
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
        
        <h2>Why Type-Safety Matters</h2>
        <p>Modern engineering isn't just about code that works; it's about code that scales. Using <strong>TypeScript</strong> and <strong>Prisma</strong> ensures that as a platform grows to millions of users, the foundation remains stable.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Debian vs. Windows: Architecting the Ultimate Dev Environment",
      slug: "debian-vs-windows-dev-environment",
      content: `
        <p>Every world-class engineer knows that your OS is your workshop. While Windows is the king of productivity and high-speed production tools, <strong>Debian Linux</strong> remains the gold standard for server stability and zero-downtime deployments.</p>
        
        <h2>The Hybrid Workflow</h2>
        <p>In my workflow, I leverage the best of both worlds: Windows for rapid UI/UX development and Debian for secure, high-performance backend orchestration. This ensures that the systems I build are compatible with the largest cloud infrastructures in the world.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log('Global Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
