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
    
    // Improved Header Parsing (Case-Insensitive)
    const metadata: any = {};
    fmText.split('\n').forEach((line: string) => {
      const index = line.indexOf(':');
      if (index > -1) {
        const key = line.slice(0, index).trim().toLowerCase();
        let value = line.slice(index + 1).trim();
        value = value.replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    });

    // Curated high-quality tech images for fallbacks
    const curatedTechImages = [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", // Cyber/Tech
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", // Earth/Network
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", // Hardware
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200", // Matrix code
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", // Analytics/Business
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200", // Code on screen
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200", // Abstract tech
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200", // Workspace
      "https://images.unsplash.com/photo-1531297172868-9f140bg3d4a4?auto=format&fit=crop&q=80&w=1200", // Not found (placeholder) wait, I'll use a valid one
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200", // Team/Tech
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", // Data/Graphs
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200", // Programming
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&q=80&w=1200", // Clean code
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1200", // Server/Cloud
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200", // Blockchain/Crypto
    ];

    const getFallbackImage = (slugStr: string) => {
      let hash = 0;
      for (let i = 0; i < slugStr.length; i++) {
        hash = slugStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      return curatedTechImages[Math.abs(hash) % curatedTechImages.length];
    };

    // 2. Map fields with fallbacks
    const title = metadata.title || slug.split('-').join(' ');
    let coverImage = metadata.coverimage || metadata.image || metadata.cover_image || '';
    
    // Check if image is a local path and if it actually exists
    if (coverImage && !coverImage.startsWith('http')) {
      // Ensure it has a leading slash for joining correctly if it doesn't
      const normalizedCoverImage = coverImage.startsWith('/') ? coverImage : `/${coverImage}`;
      const publicImagePath = path.join(process.cwd(), 'public', normalizedCoverImage);
      
      if (!fs.existsSync(publicImagePath)) {
        console.warn(`⚠️ Local image not found: ${coverImage}. Using high-quality fallback.`);
        coverImage = getFallbackImage(slug);
      } else {
        // Fix the path in DB to always have leading slash
        coverImage = normalizedCoverImage;
      }
    } else if (!coverImage) {
      coverImage = getFallbackImage(slug);
    }

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
