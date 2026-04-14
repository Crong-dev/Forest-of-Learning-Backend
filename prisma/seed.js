import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.background.createMany({
    data: [
      { name: 'green', imageUrl: '/images/green.png' },
      { name: 'yellow', imageUrl: '/images/yellow.png' },
      { name: 'blue', imageUrl: '/images/blue.png' },
      { name: 'pink', imageUrl: '/images/pink.png' },
      { name: 'workspace', imageUrl: '/images/workspace.png' },
      { name: 'desk', imageUrl: '/images/desk.png' },
      { name: 'pattern', imageUrl: '/images/pattern.png' },
      { name: 'leaf', imageUrl: '/images/leaf.png' },
    ],
  });
  console.log('Seed 완료');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
