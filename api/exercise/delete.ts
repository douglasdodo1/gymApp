import { db } from "../db";

export const deleteExercise = async (id: number) => {
  try {
    const exercise = await db.exercises.findUnique({
      where: { id: id }
    });

    if (!exercise) {
      throw new Error(`exercise with ID ${id} does not exist`);
    }

    return await db.exercises.delete({
      where: {
        id: id
      }
    });
  } catch (error) {
    console.error('Erro ao deletar o registro:', error);
    throw error;
  }
};
