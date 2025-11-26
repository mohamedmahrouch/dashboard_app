import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export const readCSV = async (filename: string) => {
 
  const filePath = path.join(process.cwd(), 'data', filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = Papa.parse(fileContent, { 
      header: true, 
      skipEmptyLines: true 
    });
    return data;
  } catch (error) {
    console.error(`Erreur de lecture:`, error);
    return [];
  }
};