import { db } from "../db";

export const getTrainning = async (id: number) => {
    const trainning = await db.trainning.findMany({
        where:{typeTrainningId:1}
    });
    
    return trainning;
}
