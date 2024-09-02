import { db } from "../db";

export const getTrainning = async (typeId: number) => {
    try {
        return await db.trainning.findMany({
            where:{typeTrainningId: typeId}
        });
        
    } catch (error) {
        throw error;
    }
    
    
}