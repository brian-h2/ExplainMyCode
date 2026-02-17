-- CreateTable
CREATE TABLE "ChatEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "issues" JSONB NOT NULL,
    "improvements" JSONB NOT NULL
);
