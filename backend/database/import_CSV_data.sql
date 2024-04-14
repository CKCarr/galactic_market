-- Import data from users.csv into Users table
LOAD DATA LOCAL INFILE './datasets/users.csv'
INTO TABLE Users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Import data from destinations.csv into Destinations table
LOAD DATA LOCAL INFILE './datasets/destinations.csv'
INTO TABLE Destinations
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Import data from market_items.csv into Market_Items table
LOAD DATA LOCAL INFILE './datasets/market_items.csv'
INTO TABLE Market_Items
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
