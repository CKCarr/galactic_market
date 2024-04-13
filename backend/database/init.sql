-- This script initializes the database schema for the Galactic Market project.

CREATE DATABASE IF NOT EXISTS mysql_galactic_db;
USE mysql_galactic_db;

CREATE TABLE Destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255) -- Optional field for image URLs
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)  -- Store hashed passwords, not plain text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    destination_id INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Market_Items (
    market_tem_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255),
    item_description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255) -- Optional field for image URLs
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Cart_Items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    ticket_id INT,
    market_item_id INT,
    quantity INT,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id),
    FOREIGN KEY (market_item_id) REFERENCES Market_Items(market_item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
