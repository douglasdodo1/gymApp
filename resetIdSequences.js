const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetIdSequences() {
  try {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Trainning';`;
    console.log('ID sequence reset for the Trainning table.');

    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='TypeTrainning';`;
    console.log('ID sequence reset for the TypeTrainning table.');

    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Exercises';`;
    console.log('ID sequence reset for the Exercises table.');

  } catch (error) {
    console.error('Error resetting ID sequence:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetIdSequences();
