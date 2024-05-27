-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "api_platform";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "app_platform";

-- CreateEnum
CREATE TYPE "app_platform"."AppUserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "api_platform"."ApiUserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "api_platform"."ApiAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "ApiAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_platform"."ApiSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_platform"."ApiUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "full_name" TEXT,
    "password" TEXT,
    "role" "api_platform"."ApiUserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_platform"."AppAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "AppAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_platform"."AppSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_platform"."AppUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "full_name" TEXT,
    "password" TEXT,
    "role" "app_platform"."AppUserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiAccount_provider_providerAccountId_key" ON "api_platform"."ApiAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiSession_sessionToken_key" ON "api_platform"."ApiSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "ApiUser_email_key" ON "api_platform"."ApiUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AppAccount_provider_providerAccountId_key" ON "app_platform"."AppAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AppSession_sessionToken_key" ON "app_platform"."AppSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "app_platform"."AppUser"("email");

-- AddForeignKey
ALTER TABLE "api_platform"."ApiAccount" ADD CONSTRAINT "ApiAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api_platform"."ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_platform"."ApiSession" ADD CONSTRAINT "ApiSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api_platform"."ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_platform"."AppAccount" ADD CONSTRAINT "AppAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_platform"."AppUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_platform"."AppSession" ADD CONSTRAINT "AppSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_platform"."AppUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
