const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Verified Authority Blog Posts...');

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

  // TRIPLE-VERIFIED IMAGE IDS
  const superSafeImages = [
    "1517694712202-14dd9538aa97", // Code
    "1504384308090-c894fdcc538d", // Server
    "1461749280684-dccba630e2f6", // Dev
    "1518770660439-4636190af475", // Chip
    "1550751827-4bd374c3f58b"  // PC
  ];

  const blogData = [
    {
      title: "The Silent Killer of Vercel Apps: Fixing 'Connection Terminated Unexpectedly'",
      slug: "fix-prisma-connection-terminated-vercel",
      content: "<p>In this post, I share how I solved the persistent connection terminated unexpectedly error on Vercel using the lazy Prisma initialization pattern.</p>",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Is AI Replacing Junior Devs? My Honest Take",
      slug: "ai-replacing-junior-devs",
      content: "<p>Exploring the shift in developer roles as AI matures and why architectural knowledge is more important than ever.</p>",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "API Design 101: Keeping Your Frontend Devs Happy",
      slug: "api-design-101",
      content: "<p>Best practices for designing APIs that are predictable, documented, and easy to consume for frontend teams.</p>",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const extraTitles = [
    "The Magic of Edge Functions: Global Speed for Free",
    "Cybersecurity for Startups: A Non-Paranoid Guide",
    "Why I Use Prisma Instead of Raw SQL in 2026",
    "Building a Multi-Language Site with Next.js i18n",
    "Dockerizing Your First Node.js App in 5 Minutes",
    "How to Handle 1 Million Users with Redis Caching",
    "The Hidden Dangers of JWT Authentication",
    "Why Your Images are Slowing Down Your Lighthouse Score",
    "React Native vs Flutter: The Battle for Mobile",
    "Micro-Frontends: Are They Still Relevant?",
    "Managing Technical Debt Without Losing Your Mind",
    "The Importance of Unit Testing",
    "Generative AI in E-commerce: Boosting Conversions",
    "Lessons from Scaling a Python NLP Tool",
    "Why You Need a Portfolio Even if You Have a Great CV",
    "The Rise of Low-Code for Internal Tools",
    "Mental Health for Engineers: Burnout is Real",
    "The Future of Web Development: My Predictions",
    "How to Explain Tech to a Non-Technical CEO",
    "Next.js vs Remix: Which One Should You Choose?",
    "The power of TypeScript in Large Scale Apps",
    "Mastering Tailwind CSS for Rapid Prototyping",
    "Serverless vs Containers: The Ultimate Comparison",
    "Why I am betting on Rust for Backend Performance",
    "Handling State in Modern React Applications",
    "The Role of UX Design in Software Engineering",
    "How to Secure Your Database in 5 Steps",
    "The impact of 5G on Web Development"
  ];

  for (let i = 0; i < extraTitles.length; i++) {
    const imgId = superSafeImages[i % superSafeImages.length];
    blogData.push({
        title: extraTitles[i],
        slug: extraTitles[i].toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: `<p>A detailed look into ${extraTitles[i]} and how it impacts modern software engineering workflows.</p>`,
        image: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=1000`
    });
  }

  for (const post of blogData) {
    await prisma.post.create({ data: { ...post, published: true } });
  }

  console.log('Final Verified Data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
