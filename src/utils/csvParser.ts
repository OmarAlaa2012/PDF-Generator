import Papa from 'papaparse';
import { BookEntry, CSVRow } from '../types/book';

export const parseCSV = (file: File): Promise<BookEntry[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const entries: BookEntry[] = results.data.map((row: CSVRow) => ({
            errorCode: row.errorCode || row['Error Code'] || row.code || '',
            category: row.category || row.Category || '',
            meaning: row.meaning || row.Meaning || '',
            details: row.details || row.Details || '',
            fix: row.fix || row.Fix || row.solution || '',
          }));
          resolve(entries);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};