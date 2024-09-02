/*
  Warnings:

  - Added the required column `order` to the `Trainning` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trainning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "typeTrainningId" INTEGER NOT NULL,
    "subType" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Trainning_typeTrainningId_fkey" FOREIGN KEY ("typeTrainningId") REFERENCES "TypeTrainning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trainning" ("exercise", "id", "quantity", "series", "state", "subType", "typeTrainningId") SELECT "exercise", "id", "quantity", "series", "state", "subType", "typeTrainningId" FROM "Trainning";
DROP TABLE "Trainning";
ALTER TABLE "new_Trainning" RENAME TO "Trainning";
CREATE UNIQUE INDEX "Trainning_order_key" ON "Trainning"("order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
