-- CreateTable
CREATE TABLE "devices" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "thingsboardAccessToken" VARCHAR(20) NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "things_board_o_auth_two" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "things_board_o_auth_two_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_name_key" ON "devices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "devices_thingsboardAccessToken_key" ON "devices"("thingsboardAccessToken");
