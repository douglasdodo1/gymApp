import { Db } from "../Db";

export const insertType = () =>{
    const db = Db();

    db.transaction(tx => {
        tx.executeSql('INSERT OR IGNORE INTO typesTrainning (id, trainning) VALUES(0, AB)');
        tx.executeSql('INSERT OR IGNORE INTO typesTrainning (id, trainning) VALUES(1, ABC)');
        tx.executeSql('INSERT OR IGNORE INTO typesTrainning (id, trainning) VALUES(2, ABCD)');
        tx.executeSql('INSERT OR IGNORE INTO typesTrainning (id, trainning) VALUES(3, ABCDE)');
        tx.executeSql('INSERT OR IGNORE INTO typesTrainning (id, trainning) VALUES(4, ABCDEF)');
    });

    console.log('valores inseridos em typesTrainning');
    
}