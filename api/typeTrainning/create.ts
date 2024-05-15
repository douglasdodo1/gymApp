import { TypeTrainning } from "@prisma/client";
import { db } from "../db";

export const createTypeTrainning = async (typeTrainning: TypeTrainning): Promise<TypeTrainning> => {
    return await db.typeTrainning.create({
        data: typeTrainning,
    })
};