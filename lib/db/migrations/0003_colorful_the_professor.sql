ALTER TABLE "orders" ALTER COLUMN "currency" SET DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping_address" jsonb;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_method" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;