-- CreateTable
CREATE TABLE "TypeTrainning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Trainning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exercise" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "typeTrainningId" INTEGER NOT NULL,
    CONSTRAINT "Trainning_typeTrainningId_fkey" FOREIGN KEY ("typeTrainningId") REFERENCES "TypeTrainning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeTrainning_type_key" ON "TypeTrainning"("type");
