import { Exercises, Trainning } from "@prisma/client";
import { db } from "../db";
import { createTrainning } from "../trainning/create";
import { getTrainning } from "../trainning/read";


export const updateTypeTrainning = async (exercise: Exercises, type:any, subType:string): Promise<any> => {
    try {
        const maxOrder = await db.trainning.aggregate({
            _max: {
              order: true,
            },
          });

        const nextOrder = (maxOrder._max.order || 0) + 1;

        await db.trainning.create({
                data:{
                    exercise: exercise.name,
                    order:nextOrder,
                    series: 0,
                    quantity: 0,
                    typeTrainningId: type.id,
                    subType: subType,
                    state: false,
                }
        })
    } catch (error) {
        throw error;
    }
};