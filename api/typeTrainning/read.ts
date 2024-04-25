import { db } from "../db";

export const getTypeTrainning = async () => {
    const type =  await db.typeTrainning.findMany({
        include: {
            trainning: true,
        },
    });

    return type;
}

