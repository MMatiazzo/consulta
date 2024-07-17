-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "crm_medico" TEXT NOT NULL,
    "data_horario" TIMESTAMP(3) NOT NULL,
    "ocupado" BOOLEAN NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" TEXT NOT NULL,
    "id_agenda" TEXT NOT NULL,
    "crm_medico" TEXT NOT NULL,
    "cpf_paciente" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "realizada" BOOLEAN NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consulta_id_agenda_key" ON "consulta"("id_agenda");

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_id_agenda_fkey" FOREIGN KEY ("id_agenda") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
