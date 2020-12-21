import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import getFullPathFile from './getFullPathFile.js';

export default (file) => {
  const format = path.extname(file);
  try {
    const pathFile = getFullPathFile(file);
    if (format === '.json') {
      return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    }
    if (format === '.yml') {
      return YAML.parse(fs.readFileSync(pathFile, 'utf8'));
    }
  } catch {
    throw new Error('unknown format or non-existent file');
  }
  return 'not file';
};
