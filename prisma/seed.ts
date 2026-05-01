const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Clear existing data
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});

  // 2. Add Projects
  const projects = [
    {
      title: "2BigMarket E-commerce",
      description: "A full-stack multi-vendor marketplace built with Next.js, Node.js, and PostgreSQL. Features real-time inventory and secure checkout.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
      tags: ["Next.js", "Node.js", "Prisma", "Tailwind"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 1
    },
    {
      title: "NLP Content Generator",
      description: "An AI-powered tool that uses Python and OpenAI to generate SEO-optimized blog content for digital marketers.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
      tags: ["Python", "OpenAI", "React", "FastAPI"],
      link: "https://2bigdev.vercel.app/projects",
      github: "https://github.com/ekutyebu",
      order: 2
    },
    {
      title: "Real Estate Portal",
      description: "A property listing and management platform for real estate agencies in Cameroon.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
      tags: ["React", "Firebase", "Google Maps API"],
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
    { name: "React / Next.js", category: "Frontend", level: 90, icon: "Code2" },
    { name: "Node.js / Express", category: "Backend", level: 85, icon: "Server" },
    { name: "Python / Django", category: "Backend", level: 80, icon: "Database" },
    { name: "Tailwind CSS", category: "Design", level: 95, icon: "Palette" },
    { name: "PostgreSQL / Prisma", category: "Backend", level: 85, icon: "Database" },
    { name: "TypeScript", category: "Frontend", level: 80, icon: "Code2" }
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
