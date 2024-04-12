-- Create the database
CREATE DATABASE IF NOT EXISTS mysql_galactic_db;
USE mysql_galactic_db;

CREATE TABLE Travelers (
    traveller_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)  -- Use bcrypt for secure hashing
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(255), 
    max_destinations INT, 
    price DECIMAL(10, 2) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT, 
    image_url VARCHAR(255) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Package_Destinations (
    package_id INT,
    destination_id INT,
    FOREIGN KEY (package_id) REFERENCES Packages(package_id),
    FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    traveller_id INT,
    package_id INT,
    quantity INT,
    departureDate DATE,
    returnDate DATE,
    FOREIGN KEY (traveller_id) REFERENCES Travelers(traveller_id),
    FOREIGN KEY (package_id) REFERENCES Packages(package_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Galactic_Market (
    market_item_id INT AUTO_INCREMENT PRIMARY KEY,
    image_id INT,
    item_name VARCHAR(255),
    item_description TEXT,
    price DECIMAL(10, 2),
    item_type ENUM('Photo Bundle', 'space_souvenir_1', "space_souvenir_2", "space_souveiner_3", "space_souveiner_4", "space_souveiner_5", "space_souveiner_6", "Custom Space Suit", "Space Wings", "Space Helmet", "Space Boots", "Galactic Gems")
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

CREATE TABLE Cart_Items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT, 
    market_item_id INT,
    quantity INT,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id),
    FOREIGN KEY (market_item_id) REFERENCES Galactic_Market(market_item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
