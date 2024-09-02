import { Trainning } from "@prisma/client";
import { db } from "../db";

export const deleteTrainning = async (id: number) => {
  try {
    const trainning = await db.trainning.findUnique({
      where: { id: id }
    });

    if (!trainning) {
      throw new Error(`Trainning with ID ${id} does not exist`);
    }

    return await db.trainning.delete({
      where: {
        id: id
      }
    });
  } catch (error) {
    console.error('Erro ao deletar o registro:', error);
    throw error;
  }
};
