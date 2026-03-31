-- CreateTable
CREATE TABLE "ChatEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "issues" JSONB NOT NULL,
    "improvements" JSONB NOT NULL,

    CONSTRAINT "ChatEntry_pkey" PRIMARY KEY ("id")
);
