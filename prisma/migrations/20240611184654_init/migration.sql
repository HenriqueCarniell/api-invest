-- CreateEnum
CREATE TYPE "Opcao" AS ENUM ('Infra', 'Desenvolvimento', 'Design', 'Planejamento');

-- CreateTable
CREATE TABLE "Investapp" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "price" INTEGER NOT NULL,
    "opcao" "Opcao" NOT NULL,

    CONSTRAINT "Investapp_pkey" PRIMARY KEY ("id")
);
