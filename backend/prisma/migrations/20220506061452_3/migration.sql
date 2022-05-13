-- AlterTable
ALTER TABLE "user" ADD COLUMN     "confirmPassword" TEXT;

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
