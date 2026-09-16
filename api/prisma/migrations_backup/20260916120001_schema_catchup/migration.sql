-- Add missing rejection reason
ALTER TABLE "Course"
ADD COLUMN "rejectionReason" TEXT;

-- Course.duration already exists as NUMERIC.
-- Existing values were verified to have no fractional part.
ALTER TABLE "Course"
ALTER COLUMN "duration" SET DEFAULT 0,
ALTER COLUMN "duration" SET DATA TYPE INTEGER;

-- Lesson.duration contains no NULL values.
ALTER TABLE "Lesson"
ALTER COLUMN "duration" SET DEFAULT 0,
ALTER COLUMN "duration" SET NOT NULL;

-- Recreate the Transaction wallet FK with ON DELETE SET NULL
ALTER TABLE "Transaction"
DROP CONSTRAINT "Transaction_walletId_fkey";

ALTER TABLE "Transaction"
ADD CONSTRAINT "Transaction_walletId_fkey"
FOREIGN KEY ("walletId")
REFERENCES "Wallet"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;