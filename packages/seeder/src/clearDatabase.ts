import { prisma } from '@discente/server/dist/config';

async function clearDatabase() {
  await prisma.user.deleteMany({});
}

clearDatabase();
