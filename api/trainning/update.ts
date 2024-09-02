import { Trainning } from "@prisma/client";
import { db } from "../db";

export const updateTrainning = async (trainning: Trainning): Promise<any> => {
    try {
        return await db.trainning.update({
            where:{
                id:trainning.id,
                
            },
            data:{
                exercise:trainning.exercise,
                series:trainning.series,
                quantity:trainning.quantity,
            },
        })
    } catch (error) {
        throw error;
    }
    
}