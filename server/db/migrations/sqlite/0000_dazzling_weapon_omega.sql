CREATE TABLE `link_clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`link_id` text NOT NULL,
	`slug` text NOT NULL,
	`timestamp` integer NOT NULL,
	`country` text,
	`region` text,
	`city` text,
	`referrer` text,
	`user_agent` text,
	`device` text,
	`browser` text,
	`os` text,
	FOREIGN KEY (`link_id`) REFERENCES `links`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `link_clicks_link_idx` ON `link_clicks` (`link_id`,`timestamp`);--> statement-breakpoint
CREATE INDEX `link_clicks_timestamp_idx` ON `link_clicks` (`timestamp`);--> statement-breakpoint
CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`label` text,
	`description` text,
	`icon` text,
	`category` text DEFAULT 'Other' NOT NULL,
	`tags` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`listed` integer DEFAULT true NOT NULL,
	`archived` integer DEFAULT false NOT NULL,
	`position` integer DEFAULT 1000 NOT NULL,
	`clicks` integer DEFAULT 0 NOT NULL,
	`dub_id` text,
	`last_clicked_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `links_slug_unique` ON `links` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `links_dub_id_unique` ON `links` (`dub_id`);--> statement-breakpoint
CREATE INDEX `links_public_idx` ON `links` (`listed`,`archived`,`position`);