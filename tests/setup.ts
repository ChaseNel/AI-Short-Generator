import prisma from "../lib/prisma";

export async function clearDatabase() {
  await prisma.asset.deleteMany();
  await prisma.generationJob.deleteMany();
  await prisma.scene.deleteMany();
  await prisma.videoProject.deleteMany();
  await prisma.user.deleteMany();
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
