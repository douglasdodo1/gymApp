import * as SQlite from 'expo-sqlite';

export const Db = () =>{
  const db = SQlite.openDatabase('gymAppDB.db');

  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS typesTrainning (id INTEGER PRIMARY KEY AUTOINCREMENT, trainning varchar(255))')
  });

  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS trainning (id INTEGER PRIMARY KEY AUTOINCREMENT'+
    ', Exercise varchar(255), series varchar(255), repetitions varchar(255)' +
    ', typesTrainningId Integer, FOREIGN KEY(typesTrainningId) REFERENCES typesTrainning(id))')
  });

  console.log('TABELAS CRIADAS');
  
  return db;
}