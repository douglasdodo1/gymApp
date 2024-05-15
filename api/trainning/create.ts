import { Trainning } from "@prisma/client";
import { db } from "../db";

export const createTrainning = async (trainning: Trainning): Promise<Trainning> => {
    return await db.trainning.create({
        data: trainning,
    })
};