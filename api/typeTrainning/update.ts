import { Exercises, Trainning } from "@prisma/client";
import { db } from "../db";
import { createTrainning } from "../trainning/create";
import { getTrainning } from "../trainning/read";


export const updateTypeTrainning = async (exerciseList: Exercises[], type:any): Promise<any> => {
    const currentExercises = await getTrainning(type.id);
    const newExercises: { exercise: string; series: number; quantity: number; typeTrainningId: any; }[] = [];

    exerciseList.forEach(element => {
        if (!currentExercises.find(e => e.exercise == element.name)) {
            const newExercise = {
                exercise: element.name,
                series: 0,
                quantity: 0,
                typeTrainningId: type.id,
            }

            newExercises.push(newExercise);
        }

    });

    try {
        console.log(newExercises);
        
        await db.trainning.createMany({data: newExercises});
    } catch (error) {
        
    }
    
};