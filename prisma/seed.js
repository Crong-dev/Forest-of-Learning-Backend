import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.background.createMany({
    data: [
      { name: 'forest', imageUrl: '/images/forest.png' },
      { name: 'night', imageUrl: '/images/night.png' },
      { name: 'ocean', imageUrl: '/images/ocean.png' },
    ],
  });
  console.log('Seed 완료');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());