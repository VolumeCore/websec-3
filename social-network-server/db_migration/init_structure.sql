CREATE DATABASE  IF NOT EXISTS `social_network_db` ;
USE `social_network_db`;

DROP TABLE IF EXISTS `followers`;

CREATE TABLE `followers` (
                             `id` bigint unsigned NOT NULL AUTO_INCREMENT,
                             `created_at` datetime(3) DEFAULT NULL,
                             `updated_at` datetime(3) DEFAULT NULL,
                             `deleted_at` datetime(3) DEFAULT NULL,
                             `user_id` bigint unsigned DEFAULT NULL,
                             `sub_id` bigint unsigned DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             KEY `idx_followers_deleted_at` (`deleted_at`),
                             KEY `fk_users_followers` (`user_id`),
                             CONSTRAINT `fk_users_followers` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;


DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
                         `id` bigint unsigned NOT NULL AUTO_INCREMENT,
                         `created_at` datetime(3) DEFAULT NULL,
                         `updated_at` datetime(3) DEFAULT NULL,
                         `deleted_at` datetime(3) DEFAULT NULL,
                         `name` longtext,
                         `user_id` bigint unsigned DEFAULT NULL,
                         `image_uid` longtext,
                         PRIMARY KEY (`id`),
                         KEY `idx_posts_deleted_at` (`deleted_at`),
                         KEY `fk_users_posts` (`user_id`),
                         CONSTRAINT `fk_users_posts` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `id` bigint unsigned NOT NULL AUTO_INCREMENT,
                         `created_at` datetime(3) DEFAULT NULL,
                         `updated_at` datetime(3) DEFAULT NULL,
                         `deleted_at` datetime(3) DEFAULT NULL,
                         `username` varchar(20) DEFAULT NULL,
                         `password_hash` bigint unsigned DEFAULT NULL,
                         `refresh_token` longtext,
                         `bio` longtext,
                         `image_uid` longtext,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `username` (`username`),
                         KEY `idx_users_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;

