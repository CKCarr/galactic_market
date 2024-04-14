-- This script initializes the database schema for the Galactic Market project.
DROP DATABASE IF EXISTS mysql_galactic_db;
CREATE DATABASE IF NOT EXISTS mysql_galactic_db;
USE mysql_galactic_db;

-- Grant privileges to the galactic_user for the mysql_galactic_db database
GRANT ALL PRIVILEGES ON mysql_galactic_db.* TO 'galactic_user'@'%';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS Destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255) -- Optional field for image URLs
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    destination_id INT,
    quantity INT DEFAULT 1,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Market_Items (
    market_item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255),
    item_description TEXT,
    price DECIMAL(10, 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

CREATE TABLE IF NOT EXISTS Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Cart_Items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    ticket_id INT,
    market_item_id INT,
    quantity INT,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id) ON DELETE CASCADE,
    FOREIGN KEY (market_item_id) REFERENCES Market_Items(market_item_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Import data from users.csv into Users table
INSERT INTO Users (user_id, username, email, password)
VALUES
    (1, 'Galaxy_Explorer', 'galaxy_explorer_1@email.com', 'GEpass1word'),
    (2, 'Star_Traveler', 'star_traveler_2@email.com', 'STpass2word'),
    (3, 'Cosmic_Wanderer', 'cosmic_wanderer_3@email.com', 'CWpass3word'),
    (4, 'Space_Voyager', 'space_voyager_4@email.com', 'SVpass4word'),
    (5, 'Astro_Pioneer', 'astro_pioneer_5@email.com', 'APpass5word');

-- Import data from destinations.csv into Destinations table
INSERT INTO Destinations (destination_id, name, description, price, image_url)
VALUES
    (1, 'Andromeda Voyage', 'Visit our neighboring galaxy, the Andromeda Galaxy (M31), and witness the spiral structure and the trillion stars that make up our closest galactic neighbor. This journey offers a glimpse into a galaxy similar to our own Milky Way but on a grander scale. Passengers can enjoy a stunning day tour of the Andromeda Galaxy, highlighting major star-forming regions and the galactic core.', 1000, 'galactic_destinations/public/images/andromeda galaxy_1.jpeg'),
    (2, 'Magellanic Cloud Expedition', 'Explore the Large and Small Magellanic Clouds, two irregular dwarf galaxies orbiting the Milky Way. Discover the rich history of stellar formation and the unique celestial phenomena found in these satellite galaxies. Attend a special event for passengers to view supernova remnants, nebulae, and the intense star-forming regions in the Magellanic Clouds. Enjoy this magnificent Galactic expedition.', 1000.00, './public/images/magellanic_cloud_1.jpeg'),
    (3, 'Triangulum Galaxy Trek', 'Journey to the Triangulum Galaxy (M33), the third-largest galaxy in our Local Group. With its spiral arms and an abundance of gas and dust, M33 offers a spectacle of star birth and cosmic wonders. Attend the ultimate interactive trek and delve into the mysteries of the Triangulum Galaxy, including its massive star clusters and the galactic halo.', 1200.00, './public/images/TriangulumGalaxy(M33)_1.jpeg'),
    (4, 'Lunar Legacy Trail', 'Relive the historic Apollo moon landings on this immersive journey to the Moon. Trace the footsteps of the legendary astronauts and explore the iconic sites of humanity''s first off-world steps. Engage in a group moonwalk experience, visiting famous sites like Tranquility Base, where Apollo 11 landed. Enjoy this educational tour that details the history of lunar exploration, and witness the Earthrise from the lunar surface.', 1800.00, './public/images/earth_rise.jpg'),
    (5, 'Red Planet Odyssey', 'Dive into the heart of Mars exploration with a journey to the Red Planet, following the path of the intrepid rovers that have traversed its alien landscapes. Discover the secrets of Mars, from ancient river valleys to towering volcanoes. Participate in a guided rover tour, explore the Martian terrain, and visit significant landmarks discovered by rovers like Spirit, Opportunity, Curiosity, and Perseverance. Learn about the search for past life and current geological processes as you ride through the red planet.', 1600.00, './public/images/mars_1.jpg'),
    (6, 'Stellar Nebula Adventure', 'Dive into the vibrant and chaotic beauty of star-forming nebulas. Witness the birth of stars in these gaseous clouds and marvel at the intricate cosmic structures they form. This cosmic adventure is a wondrous sense of discovery into the cycle of life and death across the cosmos. Participate in fly-throughs of iconic nebulas like the Eagle Nebula or the Orion Nebula. Learn about stellar evolution and the role that nebulas play in shaping the universe as you tour the galaxy of awe and wonder.', 1400.00, './public/images/eagle_nebula.jpeg');

-- Import data from market_items.csv into Market_Items table
INSERT INTO Market_Items (market_item_id, item_name, item_description, price)
VALUES
    (1, 'Photo Bundle', 'A collection of stunning space photographs.', 50),
    (2, 'Meteorite Fragments', 'Authentic fragments from meteorites.', 100),
    (3, 'Galactic Gems', 'Rare and beautiful gems from distant galaxies.', 500),
    (4, 'Space Food Bundle', 'Assorted space-themed snacks.', 20),
    (5, 'Martian Soil Sample', 'A genuine sample of Martian soil.', 200),
    (6, 'Drinkable Asteroid Water', 'Purified water from an asteroid.', 10),
    (7, 'Space Suit', 'A high-quality space suit for spacewalks.', 500),
    (8, 'Space Boots', 'Durable boots designed for space exploration.', 150),
    (9, 'Space Helmet', 'A protective helmet for space missions.', 300),
    (10, 'Ornate Space Wings', 'Beautifully crafted wings for zero-gravity flights.', 1000);
