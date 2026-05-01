const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Real Portfolio Data...');

  // 1. Clear existing data
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.post.deleteMany({});

  // 2. Add your 6 Real Projects
  const projects = [
    {
      title: "INOVAMARK – Full E-commerce Marketplace",
      description: "A complete marketplace ecosystem featuring a robust cart, vendor management system, multi-language support, and secure payment integration.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"],
      link: "https://e-vendor-two.vercel.app/en",
      github: "https://github.com/ekutyebu",
      order: 1
    },
    {
      title: "VICALU – Industrial Product Catalog",
      description: "A professional catalog platform for industrial materials including aluminium, glass, hardware, and composite panels.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Next.js", "Tailwind", "Responsive Design"],
      link: "https://vicalu.vercel.app",
      github: "https://github.com/ekutyebu",
      order: 2
    },
    {
      title: "Dynasty Group Ltd – Corporate Agricultural Site",
      description: "Enterprise corporate portal for agricultural consultancy, specializing in labor outsourcing, irrigation systems, and professional advisory.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Next.js", "Tailwind", "Corporate"],
      link: "https://dynasty-group-ltd.vercel.app",
      github: "https://github.com/ekutyebu",
      order: 3
    },
    {
      title: "TechAscend – Fellowship Application Portal",
      description: "A high-performance application portal featuring multi-step complex forms, program roadmaps, and an integrated technical blog.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
      tags: ["Next.js", "Tailwind", "Form Logic", "SEO"],
      link: "https://www.tech-ascend.com",
      github: "https://github.com/ekutyebu",
      order: 4
    },
    {
      title: "Bloosom Tech – Brand / Business Website",
      description: "A modern, high-conversion brand website designed with clean aesthetics and pixel-perfect responsiveness.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Next.js", "Tailwind", "Branding"],
      link: "https://bloosom-tech.vercel.app",
      github: "https://github.com/ekutyebu",
      order: 5
    },
    {
      title: "TechX Sentiment Project – Python NLP Tool",
      description: "Advanced Natural Language Processing tool leveraging TextBlob for automated sentiment classification and text analysis.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
      tags: ["Python", "TextBlob", "NLP", "Data Science"],
      link: "https://github.com/ekutyebu/techx-sentiment-project",
      github: "https://github.com/ekutyebu/techx-sentiment-project",
      order: 6
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // 3. Add Skills
  const skills = [
    { name: "Next.js 14 / React", category: "Frontend", level: 95 },
    { name: "Node.js Architecture", category: "Backend", level: 90 },
    { name: "Python / NLP", category: "AI", level: 85 },
    { name: "PostgreSQL / Prisma", category: "Infrastructure", level: 90 },
    { name: "Tailwind CSS", category: "Frontend", level: 95 },
    { name: "Debian Linux Admin", category: "Infrastructure", level: 82 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // 4. Add Global Blog Posts
  const posts = [
    {
      title: "The Silent Killer of Vercel Apps: Fixing 'Connection Terminated Unexpectedly'",
      slug: "fix-prisma-connection-terminated-vercel",
      content: `
        <p>Let's be honest: nothing kills a launch day like seeing a random 500 error in your Vercel logs while your local machine works perfectly. If you're using <strong>Prisma</strong> and <strong>Neon</strong>, you've probably seen it: <em>"Connection terminated unexpectedly."</em></p>
        <h2>Why It Happens</h2>
        <p>In a serverless environment, your functions wake up and fall asleep constantly. Standard connections aren't built for this. The fix is using a <strong>Lazy Initialization</strong> pattern to ensure your app only connects when it needs to.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Why Debian is my OS of Choice for Production Servers",
      slug: "why-debian-for-production",
      content: `
        <p>When it comes to stability and security, nothing beats Debian. In this post, I explain how I architect zero-downtime systems using Debian-hardened environments.</p>
      `,
      published: true,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log('Real Portfolio Data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
