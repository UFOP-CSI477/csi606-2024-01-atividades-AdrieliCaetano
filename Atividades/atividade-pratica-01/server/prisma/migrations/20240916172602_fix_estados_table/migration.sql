/*
  Warnings:

  - You are about to drop the column `update_at` on the `estados` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_estados" ("created_at", "id", "nome", "sigla") SELECT "created_at", "id", "nome", "sigla" FROM "estados";
DROP TABLE "estados";
ALTER TABLE "new_estados" RENAME TO "estados";
CREATE UNIQUE INDEX "estados_sigla_key" ON "estados"("sigla");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
