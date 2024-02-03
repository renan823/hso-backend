-- CreateTable
CREATE TABLE "Words" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Synonyms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word1" TEXT NOT NULL,
    "word2" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Words_text_key" ON "Words"("text");
