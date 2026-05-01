
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      image: true
    },
    take: 10
  });
  console.log(JSON.stringify(posts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
