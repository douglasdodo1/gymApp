import { Exercises } from "@prisma/client";
import { db } from "../db";

export const createExercise = async (exerciseName: string): Promise<Exercises> => {
    console.log(`vou criar o exercicio: ${exerciseName}`);
    
    return await db.exercises.create({
        data: {
            name: exerciseName,  
        },
    });
};
