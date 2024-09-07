-- CreateTable
CREATE TABLE "tipos_sanguineos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "fator" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    "tipo_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Pessoas_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pessoas_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipos_sanguineos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
