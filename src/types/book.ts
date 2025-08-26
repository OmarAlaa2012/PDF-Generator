export interface BookEntry {
  errorCode: string;
  category: string;
  meaning: string;
  details: string;
  fix: string;
}

export interface CSVRow {
  [key: string]: string;
}