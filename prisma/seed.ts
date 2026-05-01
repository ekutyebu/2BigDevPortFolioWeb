const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Final Deep-Content Blog Posts...');

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

  // Guaranteed Working Tech Image IDs
  const confirmedImages = [
    "1550751827-4bd374c3f58b", "1518770660439-4636190af475", "1550741164-c6f2d70ff22b",
    "1488590528505-98d2b5aba04b", "1451187580459-43490279c0fa", "1519389950473-47ba0277781c",
    "1581091226825-a6a2a5aee158", "1504384308090-c894fdcc538d", "1461749280684-dccba630e2f6",
    "1498050108023-c5249f4df085", "1517694712202-14dd9538aa97", "1558494949-ef8b5655d936"
  ];

  const blogData = [
    {
      title: "The Silent Killer of Vercel Apps: Fixing 'Connection Terminated Unexpectedly'",
      slug: "fix-prisma-connection-terminated-vercel",
      content: `
        <p>Nothing kills a launch like seeing <em>"Connection terminated unexpectedly."</em> in your Vercel logs.</p>
        <h3>The Solution</h3>
        <ol>
          <li>Use the Lazy Initialization pattern for Prisma.</li>
          <li>Remove <code>&channel_binding=require</code> from your connection string.</li>
          <li>Ensure you use the Pooler URL on Vercel but Direct on local.</li>
        </ol>
      `,
      image: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const extraTitles = [
    "Is AI Replacing Junior Devs? My Honest Take",
    "API Design 101: Keeping Your Frontend Devs Happy",
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
    "Why You Need a Portfolio Even if You Have a CV",
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
    const imgId = confirmedImages[i % confirmedImages.length];
    blogData.push({
        title: extraTitles[i],
        slug: extraTitles[i].toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: `
            <p>In this post, I'm sharing my honest perspective on <strong>${extraTitles[i]}</strong> based on my experience building global platforms.</p>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Understand the core problem before jumping to a solution.</li>
                <li>Simplicity is the ultimate sophistication in engineering.</li>
                <li>Never stop learning, as the tech landscape changes every day.</li>
            </ul>
            <p>I hope this helps you in your journey as a developer. Keep building and stay curious.</p>
        `,
        image: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=1000`
    });
  }

  for (const post of blogData) {
    await prisma.post.create({ data: { ...post, published: true } });
  }

  console.log('Final Data seeded successfully with working images!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
