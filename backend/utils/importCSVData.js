// utils/importCSVData.js
import { readCSV } from './readCSV';

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

        connection.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log(`Imported ${result.affectedRows} rows into ${tableName}`);
        });
    } catch (error) {
        console.error('Error importing CSV data:', error);
    }
};
