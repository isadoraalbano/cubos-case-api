-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_accountId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_ownerId_fkey";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "accountId" DROP NOT NULL,
ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;
