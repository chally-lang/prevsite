import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function check() {
  try {
    const count = await prisma.user.count();
    console.log('User count:', count);
  } catch (err) {
    console.error('Error counting users:', err);
  } finally {
    await prisma.$disconnect();
  }
}
check();
