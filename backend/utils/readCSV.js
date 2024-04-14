// utils/readCSV.js
import fs from 'fs';
import { parse } from 'csv-parse';

// Helper function to read and parse CSV file asynchronously
export const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (readErr, fileContent) => {
            if (readErr) {
                reject(readErr);
                return;
            }
            parse(fileContent, { columns: true, skip_empty_lines: true }, (parseErr, records) => {
                if (parseErr) reject(parseErr);
                else resolve(records);
            });
        });
    });
};
export default readCSV;
javascript
