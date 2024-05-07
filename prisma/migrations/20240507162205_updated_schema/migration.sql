-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "categoryId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
