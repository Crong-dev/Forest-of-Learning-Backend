/*
  Warnings:

  - A unique constraint covering the columns `[studyId,emoji]` on the table `EmojiReaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `count` to the `EmojiReaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmojiReaction" ADD COLUMN     "count" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmojiReaction_studyId_emoji_key" ON "EmojiReaction"("studyId", "emoji");
