const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 STARTING BULLETPROOF BLOG SYNC...');

  const blogDir = path.join(process.cwd(), 'blog');
  if (!fs.existsSync(blogDir)) {
    console.error('❌ Blog directory not found!');
    return;
  }

  const files = fs.readdirSync(blogDir).filter((file: string) => file.endsWith('.mdx'));
  console.log(`📂 Processing ${files.length} files...`);

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const slug = file.replace('.mdx', '');

    // 1. Extract Frontmatter more reliably
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---/);
    if (!frontmatterMatch) {
      console.warn(`⚠️ Skipping ${file}: No frontmatter found.`);
      continue;
    }

    const fmText = frontmatterMatch[1];
    const content = fileContent.replace(frontmatterMatch[0], '').trim();
    
    // Improved Header Parsing
    const metadata: any = {};
    fmText.split('\n').forEach((line: string) => {
      const index = line.indexOf(':');
      if (index > -1) {
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        // Clean up quotes (both single and double)
        value = value.replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    });

    // 2. Map fields carefully
    const title = metadata.title || slug.split('-').join(' ');
    const coverImage = metadata.coverImage || '';
    const date = metadata.date ? new Date(metadata.date) : new Date();

    await prisma.post.upsert({
      where: { slug },
      update: {
        title,
        content,
        image: coverImage,
        published: true,
        updatedAt: new Date(),
      },
      create: {
        title,
        slug,
        content,
        image: coverImage,
        published: true,
        createdAt: date,
      },
    });

    console.log(`✅ Synced: ${title} ${coverImage ? '🖼️' : '⚠️ No Image'}`);
  }

  // --- RE-SEED PROJECTS (Keep intact) ---
  const projects = [
    { title: "INOVAMARK", description: "Full marketplace with cart, vendor system, multi-language, payment integration", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Node.js", "PostgreSQL"], link: "https://e-vendor-two.vercel.app/en", order: 1 },
    { title: "VICALU", description: "Industrial catalog for aluminium, glass, hardware, composite panels", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://vicalu.vercel.app", order: 2 },
    { title: "Dynasty Group Ltd", description: "Corporate site for agricultural company (labour, irrigation, consultancy)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://dynasty-group-ltd.vercel.app", order: 3 },
    { title: "TechAscend", description: "Fellowship Application Portal with multi-step forms, blog, program roadmap", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000", tags: ["Next.js", "Tailwind"], link: "https://www.tech-ascend.com", order: 4 },
    { title: "Bloosom Tech", description: "Modern brand website with clean responsive design", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", tags: ["React", "Next.js", "Tailwind"], link: "https://bloosom-tech.vercel.app", order: 5 },
    { title: "TechX Sentiment Project", description: "Sentiment analysis engine using Python and TextBlob for classification", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000", tags: ["Python", "TextBlob", "NLP"], link: "https://github.com/ekutyebu/techx-sentiment-project", order: 6 }
  ];
  await prisma.project.deleteMany({});
  for (const p of projects) await prisma.project.create({ data: p });

  console.log('🏁 SYNC FINISHED SUCCESSFULLY!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
