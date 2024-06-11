import { Trainning } from "@prisma/client";
import { db } from "../db";

export const updateManyTrainning = async (trainning: Trainning[]): Promise<any> => {
    try {
        const promises = trainning.map(async (item) => {
            const updatedTrainning = await db.trainning.update({
                where: {
                    typeTrainningId: 1,
                    id: item.id
                },
                data: {
                    quantity: item.quantity,
                    series: item.series
                }
            });
            return updatedTrainning; // Retorna o resultado da atualização
        });
        
        const updatedTrainnings = await Promise.all(promises); // Aguarda todas as atualizações serem concluídas

        return updatedTrainnings; // Retorna os resultados das atualizações

    } catch (error) {
        throw error;
    }
}
