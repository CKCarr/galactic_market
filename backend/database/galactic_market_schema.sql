-- Create Tables for mySQL Database

CREATE TABLE `galactic_cruisecourt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spacecruise_name` varchar(255) NOT NULL,
  `spacecruise_description` varchar(255) NOT NULL,
  `spacecruise_price` int(11) NOT NULL,
  `spacecruise_passengers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Path: backend/database/galactic_market_data.sql
-- Insert Data into mySQL Database

