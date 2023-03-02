CREATE TABLE 
  `users` (
    `username` TEXT not null,
    `password` TEXT not null,
    `created_at` datetime not null default CURRENT_TIMESTAMP,
    `roles` TEXT not null,
    primary key (`username`)
  )

