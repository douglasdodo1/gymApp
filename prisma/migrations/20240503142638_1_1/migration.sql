/*
  Warnings:

  - You are about to drop the column `name` on the `TypeTrainning` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TypeTrainning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);
INSERT INTO "new_TypeTrainning" ("id", "type") SELECT "id", "type" FROM "TypeTrainning";
DROP TABLE "TypeTrainning";
ALTER TABLE "new_TypeTrainning" RENAME TO "TypeTrainning";
CREATE UNIQUE INDEX "TypeTrainning_type_key" ON "TypeTrainning"("type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
