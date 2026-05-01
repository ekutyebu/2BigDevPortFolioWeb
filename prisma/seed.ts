const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 CRAWLING /blog DIRECTORY FOR MASTERCLASS POSTS...');

  // 1. Clean existing data (Optional: remove if you want to keep manual posts)
  // await prisma.post.deleteMany({}); 

  const blogDir = path.join(process.cwd(), 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.error('❌ Blog directory not found! Run the blog generation step first.');
    return;
  }

  const files = fs.readdirSync(blogDir).filter((file: string) => file.endsWith('.mdx'));
  console.log(`📂 Found ${files.length} MDX files. Parsing...`);

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const slug = file.replace('.mdx', '');

    // Simple Regex-based Frontmatter Parser (No dependencies needed)
    const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
    const match = fileContent.match(frontmatterRegex);

    if (match) {
      const frontmatterStr = match[1];
      const content = fileContent.replace(frontmatterRegex, '').trim();
      
      const frontmatter: any = {};
      frontmatterStr.split('\n').forEach((line: string) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
          frontmatter[key.trim()] = value;
        }
      });

      // 2. Upsert the post (Update if exists, Create if new)
      await prisma.post.upsert({
        where: { slug: slug },
        update: {
          title: frontmatter.title || 'Untitled Post',
          content: content,
          image: frontmatter.coverImage || '',
          published: true,
          updatedAt: new Date(),
        },
        create: {
          title: frontmatter.title || 'Untitled Post',
          slug: slug,
          content: content,
          image: frontmatter.coverImage || '',
          published: true,
          createdAt: new Date(frontmatter.date || Date.now()),
        },
      });

      console.log(`✅ Synced: ${frontmatter.title}`);
    }
  }

  // --- RE-SEED PROJECTS & SKILLS (Keep these intact) ---
  const projects = [
    { title: "INOVAMARK", description: "Full marketplace with cart, vendor system, multi-language, payment integration", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Node.js", "PostgreSQL"], link: "https://e-vendor-two.vercel.app/en", order: 1 },
    { title: "VICALU", description: "Industrial catalog for aluminium, glass, hardware, composite panels", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://vicalu.vercel.app", order: 2 },
    { title: "Dynasty Group Ltd", description: "Corporate site for agricultural company (labour, irrigation, consultancy)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://dynasty-group-ltd.vercel.app", order: 3 },
    { title: "TechAscend", description: "Fellowship Application Portal with multi-step forms, blog, program roadmap", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000", tags: ["Next.js", "Tailwind"], link: "https://www.tech-ascend.com", order: 4 },
    { title: "Bloosom Tech", description: "Modern brand website with clean responsive design", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://bloosom-tech.vercel.app", order: 5 },
    { title: "TechX Sentiment Project", description: "Sentiment analysis engine using Python and TextBlob for classification", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000", tags: ["Python", "TextBlob", "NLP"], link: "https://github.com/ekutyebu/techx-sentiment-project", order: 6 }
  ];
  // --- RE-SEED PROJECTS ---
  await prisma.project.deleteMany({});
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  console.log('🏁 DATABASE SYNC COMPLETE!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
