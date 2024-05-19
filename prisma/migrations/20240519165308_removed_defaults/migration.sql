-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "authorId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "categoryId" DROP DEFAULT;
