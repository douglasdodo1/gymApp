const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const getType = async () => {
    const type =  await prisma.users.findMany();
    return type;
}

