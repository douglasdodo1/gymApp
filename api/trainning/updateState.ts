import { db } from "../db";


export const updateState = async (idExercise: number, newState: boolean, typeTrainningId: number): Promise<any> => {
    try {
      console.log(idExercise, typeTrainningId, newState);
  
      return await db.trainning.update({
        where: {
          id: idExercise,
          typeTrainningId: typeTrainningId,
        },
        data: {
          state: newState,
        },
      });
    } catch (error) {
      throw error;
    }
  };