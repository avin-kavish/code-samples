-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('weekday', 'saturday', 'sunday');

-- CreateTable
CREATE TABLE "Fare" (
    "id" BIGSERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "peakFare" DECIMAL(65,30) NOT NULL,
    "offPeakFare" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Fare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FareCap" (
    "id" BIGSERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "dailyCap" DECIMAL(65,30) NOT NULL,
    "weeklyCap" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "FareCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeakHour" (
    "id" SERIAL NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,

    CONSTRAINT "PeakHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" BIGSERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customerId" BIGINT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fare_from_to_key" ON "Fare"("from", "to");

-- CreateIndex
CREATE UNIQUE INDEX "FareCap_from_to_key" ON "FareCap"("from", "to");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
