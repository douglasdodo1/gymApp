import { Trainning } from "@prisma/client";
import { db } from "../db";
import { indexOf } from "lodash";

export const updateManyTrainning = async (trainning: Trainning[]): Promise<any> => {
    try {
        const promises = trainning.map(async (item) => {
            const updatedTrainning = await db.trainning.update({
                where: {
                    typeTrainningId: item.typeTrainningId,
                    id: item.id,
                },
                data: {
                    quantity: item.quantity,
                    series: item.series,
                    order: indexOf(trainning,item)+1
                }
            });
            return updatedTrainning; 
        });
        
        const updatedTrainnings = await Promise.all(promises); 

        return updatedTrainnings; 

    } catch (error) {
        throw error;
    }
}
