CREATE TABLE IF NOT EXISTS "store" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"userId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
