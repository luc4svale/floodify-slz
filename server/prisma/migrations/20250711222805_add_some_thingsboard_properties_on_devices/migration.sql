/*
  Warnings:

  - The primary key for the `devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `thingsboardAccessToken` on the `devices` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `devices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(12)`.
  - You are about to drop the `things_board_o_auth_two` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thingsBoardId]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thingsBoardAccessToken]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thingsBoardAccessToken` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thingsBoardId` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('WATER_SENSOR');

-- DropIndex
DROP INDEX "devices_thingsboardAccessToken_key";

-- AlterTable
ALTER TABLE "devices" DROP CONSTRAINT "devices_pkey",
DROP COLUMN "thingsboardAccessToken",
ADD COLUMN     "label" VARCHAR(50) NOT NULL,
ADD COLUMN     "thingsBoardAccessToken" VARCHAR(20) NOT NULL,
ADD COLUMN     "thingsBoardId" VARCHAR(36) NOT NULL,
ADD COLUMN     "type" "DeviceType" NOT NULL DEFAULT 'WATER_SENSOR',
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(12),
ADD CONSTRAINT "devices_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "things_board_o_auth_two";

-- CreateTable
CREATE TABLE "things_board_auth" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "things_board_auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_thingsBoardId_key" ON "devices"("thingsBoardId");

-- CreateIndex
CREATE UNIQUE INDEX "devices_thingsBoardAccessToken_key" ON "devices"("thingsBoardAccessToken");
