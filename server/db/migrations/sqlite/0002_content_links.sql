DROP TABLE `links`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_link_clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`timestamp` integer NOT NULL,
	`country` text,
	`region` text,
	`city` text,
	`referrer` text,
	`user_agent` text,
	`device` text,
	`browser` text,
	`os` text
);
--> statement-breakpoint
INSERT INTO `__new_link_clicks`("id", "slug", "timestamp", "country", "region", "city", "referrer", "user_agent", "device", "browser", "os") SELECT "id", "slug", "timestamp", "country", "region", "city", "referrer", "user_agent", "device", "browser", "os" FROM `link_clicks`;--> statement-breakpoint
DROP TABLE `link_clicks`;--> statement-breakpoint
ALTER TABLE `__new_link_clicks` RENAME TO `link_clicks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `link_clicks_slug_idx` ON `link_clicks` (`slug`,`timestamp`);--> statement-breakpoint
CREATE INDEX `link_clicks_timestamp_idx` ON `link_clicks` (`timestamp`);