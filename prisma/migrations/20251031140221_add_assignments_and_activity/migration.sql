-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActive" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "counsellorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Assignment_patientId_idx" ON "Assignment"("patientId");

-- CreateIndex
CREATE INDEX "Assignment_counsellorId_idx" ON "Assignment"("counsellorId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_patientId_counsellorId_key" ON "Assignment"("patientId", "counsellorId");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_counsellorId_fkey" FOREIGN KEY ("counsellorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
