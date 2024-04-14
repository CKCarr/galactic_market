// database/CSV_to_SQL.js
import { importCSVData } from './utils/importCSVData';

// Import data from users.csv into Users table
importCSVData('./datasets/users.csv', 'Users');

// Import data from destinations.csv into Destinations table
importCSVData('./datasets/destinations.csv', 'Destinations');

// Import data from market_items.csv into Market_Items table
importCSVData('./datasets/market_items.csv', 'Market_Items');
