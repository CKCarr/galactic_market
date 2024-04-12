// utils/readCSV.js
import fs from 'fs';
import { parse } from 'csv-parse';

// Helper function to read and parse CSV file asynchronously
export const readCSV = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve, reject) => {
        parse(fileContent, { columns: true, skip_empty_lines: true }, (err, records) => {
            if (err) reject(err);
            else resolve(records);
        });
    });
};
