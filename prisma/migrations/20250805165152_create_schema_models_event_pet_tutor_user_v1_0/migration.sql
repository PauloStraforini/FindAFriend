-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "StatsOfEvent" AS ENUM ('PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutors" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "socialName" TEXT,
    "cpf" VARCHAR(11) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "email" TEXT,
    "date_of_birth" TEXT,
    "phone_number" TEXT NOT NULL,
    "gender" TEXT,
    "unique_card" TEXT,
    "about" TEXT,
    "cep" VARCHAR(8),
    "street" TEXT,
    "number_house" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "nameEmergencyContact" TEXT,
    "phoneNumberEmergency" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "rga" VARCHAR(15) NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "age" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "castrated" TEXT,
    "sex" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "weight" TEXT,
    "weight_class" VARCHAR(20) NOT NULL,
    "primary_color" TEXT,
    "date_of_application" TEXT,
    "microchip" VARCHAR(15),
    "veterinarian" TEXT,
    "manufacturerOfMicrochip" TEXT,
    "social_name" TEXT,
    "origin" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "housing" TEXT,
    "characteristics" TEXT,
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tutorsId" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stats_of_event" "StatsOfEvent" NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "cep" VARCHAR(8) NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number_house" TEXT,
    "author_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "acceptedAnimalTypes" TEXT[],
    "acceptedSexes" TEXT[],
    "excludedBreeds" TEXT[],
    "date_of_event" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "total_vacancies" INTEGER NOT NULL,
    "registered" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tutors_cpf_key" ON "Tutors"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Tutors_cnpj_key" ON "Tutors"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Tutors_email_key" ON "Tutors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "events_email_key" ON "events"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_tutorsId_fkey" FOREIGN KEY ("tutorsId") REFERENCES "Tutors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
