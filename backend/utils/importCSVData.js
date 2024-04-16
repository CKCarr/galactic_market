// utils/importCSVData.js
import { readCSV } from './readCSV';
import { mysqlPool } from '../db.js';

// Function to import data from CSV into MySQL database
export const importCSVData = async (filePath, tableName) => {
    try {
        const records = await readCSV(filePath);
        if (records.length === 0) {
            console.log('No data found in CSV file:', filePath);
            return;
        }

        const keys = Object.keys(records[0]);
        const columns = keys.join(',');
        const values = records.map(record => keys.map(key => record[key]));

        const sql = `INSERT INTO ${tableName} (${columns}) VALUES ?`;

        mysqlPool.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log(`Imported ${result.affectedRows} rows into ${tableName}`);
        });
    } catch (error) {
        console.error('Error importing CSV data:', error);
    }
};

importCSVData('./datasets/users.csv', 'Users');
importCSVData('./datasets/market_items.csv', 'Market_Items');
importCSVData('./datasets/destinations.csv', 'Destinations');
// Path: backend/utils/readCSV.js
// Function to read data from a CSV file

export default importCSVData;
