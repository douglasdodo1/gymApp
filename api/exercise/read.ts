import { db } from "../db";

export const getExercise = async () => {
    const exercises =  await db.exercises.findMany();
    return exercises;
}

