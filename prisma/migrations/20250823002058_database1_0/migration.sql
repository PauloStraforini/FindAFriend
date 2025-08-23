-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "StatsOfEvent" AS ENUM ('PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExternalType" AS ENUM ('User', 'Pet', 'Tutor');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutors" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "cnpj" VARCHAR(14),
    "username" TEXT NOT NULL,
    "social_name" TEXT,
    "email" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "phone_number" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "unique_card" TEXT,
    "about" TEXT,
    "cep" VARCHAR(8),
    "street" TEXT,
    "number_house" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "name_emergency_contact" TEXT,
    "phone_number_emergency" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "rga" VARCHAR(15) NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "age" TEXT,
    "castrated" BOOLEAN,
    "sex" "SEX" NOT NULL,
    "type" "TYPE" NOT NULL,
    "breed" TEXT NOT NULL,
    "weight" DECIMAL(65,30),
    "weight_class" VARCHAR(20),
    "primary_color" TEXT,
    "about" TEXT NOT NULL,
    "microchip" VARCHAR(15),
    "date_of_application" TIMESTAMP(3),
    "veterinarian" TEXT,
    "manufacturer_of_microchip" TEXT,
    "social_name" TEXT,
    "origin" TEXT,
    "housing" TEXT,
    "characteristics" TEXT,
    "tutors_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "stats_of_event" "StatsOfEvent" NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number_house" TEXT,
    "complement" TEXT,
    "author_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "accepted_animal_types" TEXT[],
    "accepted_sexes" TEXT[],
    "exclude_breeds" TEXT[],
    "date_of_event" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "total_vacancies" INTEGER NOT NULL,
    "registered" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "externalType" "ExternalType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_registration_key" ON "user"("registration");

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
CREATE UNIQUE INDEX "Tutors_unique_card_key" ON "Tutors"("unique_card");

-- CreateIndex
CREATE UNIQUE INDEX "pets_rga_key" ON "pets"("rga");

-- CreateIndex
CREATE UNIQUE INDEX "pets_microchip_key" ON "pets"("microchip");

-- CreateIndex
CREATE UNIQUE INDEX "events_email_key" ON "events"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_tutors_id_fkey" FOREIGN KEY ("tutors_id") REFERENCES "Tutors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
