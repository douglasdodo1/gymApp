const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const getTypeTrainning = async () => {
    const type =  await prisma.typeTrainning.findMany();
    console.log(type);
    
    return type;
}

