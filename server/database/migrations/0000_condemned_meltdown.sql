CREATE TABLE `maintenances`
(
    `id`         integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `reason`     text    DEFAULT '',
    `enabled`    integer DEFAULT false NOT NULL,
    `begin_at`   text    DEFAULT (CURRENT_DATE),
    `end_at`     text    DEFAULT (CURRENT_DATE),
    `created_at` text    DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `posts`
(
    `slug`       text PRIMARY KEY NOT NULL,
    `likes`      integer DEFAULT 0,
    `views`      integer DEFAULT 0,
    `created_at` text    DEFAULT (CURRENT_DATE)
);
