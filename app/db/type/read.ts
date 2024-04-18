import { Db } from "../Db";

export const readType = (callback: (data: any[]) => void) => {
    const db = Db();

    db.transaction(tx => {
        tx.executeSql('SELECT * from typesTrainning', [], (txObj, resultSet) => {
            const data = resultSet.rows._array;
            console.log(data); 
            callback(data); // Chama a callback com os dados
        });
    });
}
