-- -------------------------------------------------------------
-- Stadtfinanzen.de Database Schema
-- Compatible with MySQL 5.7+ and MySQL 8.0+
-- -------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `germany_real_estate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `germany_real_estate`;

-- 1. Site Settings (for CMS general texts)
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` LONGTEXT NOT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` VARCHAR(50) NOT NULL,
  `tag` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `date_text` VARCHAR(50) NOT NULL,
  `read_time` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Leads (Form & AI Chat submissions)
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(50) NOT NULL,
  `type` VARCHAR(20) NOT NULL, -- 'investor', 'city', 'chat'
  `name` VARCHAR(100) NOT NULL,
  `company` VARCHAR(120) DEFAULT NULL,
  `email` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(40) DEFAULT NULL,
  `investor_type` VARCHAR(50) DEFAULT NULL,
  `investment_range` VARCHAR(50) DEFAULT NULL,
  `details` JSON DEFAULT NULL, -- full fields and chat transcripts
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- Pre-populate Default Site Content
-- -------------------------------------------------------------

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('hero_title', 'Städtische Projekte mit privaten Investoren finanzieren.'),
('hero_subtitle', 'Banken · Family Offices · Fondsgesellschaften — national und international. Für Infrastruktur, Schulen, Kindergärten und Quartiere. Persönlich vermittelt, kein automatisches Matching, keine Listing-Fee.'),
('hero_video_url', ''),
('video_city_url', ''),
('video_investor_url', ''),
('contact_email', 'kontakt@stadtfinanzen.de'),
('contact_phone', '+49 (0) 30 555 01 20'),
('contact_address', 'Stadtfinanzen.de, Deutschland'),
('blog_title', 'Beiträge unserer Partner zum kommunalen Investmentumfeld.'),
('hero_stats', '[{"value": "3.000+", "label": "Investoren & Banken"}, {"value": "0,5 %", "label": "Provision p.a."}, {"value": "0 €", "label": "Listing-Fee"}, {"value": "100 %", "label": "Persönliche Betreuung"}]')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- -------------------------------------------------------------
-- Pre-populate Default Blog Posts
-- -------------------------------------------------------------

INSERT INTO `blog_posts` (`id`, `tag`, `title`, `excerpt`, `date_text`, `read_time`) VALUES
('post-1', 'Stadtentwicklung', 'Warum mittelgroße deutsche Städte zur nächsten institutionellen Assetklasse werden', 'Mittelstädte in Deutschland liefern auf risikoadjustierter Basis zunehmend bessere Renditen als die Metropolen. Was wir in unserer Pipeline sehen.', 'März 2026', '6 Min. Lesezeit'),
('post-2', 'Energie & Infrastruktur', 'Geduldiges Kapital für kommunale Erneuerbare', 'Wie langfristige Infrastrukturmandate und EU-Förderinstrumente die Finanzierung der Energiewende auf kommunaler Ebene verändern.', 'Februar 2026', '8 Min. Lesezeit'),
('post-3', 'Öffentlich-private Partnerschaft', 'ÖPP-Strukturen, die wirklich zur Unterschrift führen', 'Ein kompakter Leitfaden für Kämmerer und Stadträte zu Strukturen, die vom MoU bis zur Signatur tragen, ohne Marktvertrauen zu verspielen.', 'Januar 2026', '5 Min. Lesezeit')
ON DUPLICATE KEY UPDATE `tag` = VALUES(`tag`), `title` = VALUES(`title`), `excerpt` = VALUES(`excerpt`), `date_text` = VALUES(`date_text`), `read_time` = VALUES(`read_time`);
