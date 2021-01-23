import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

export default (file) => {
  const format = path.extname(file);
  try {
    const pathFile = path.resolve(process.cwd(), file);
    if (format === '.json') {
      return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    }
    if (format === '.yml') {
      return YAML.parse(fs.readFileSync(pathFile, 'utf8'));
    }
    if (format === '.txt') {
      return file;
    }
  } catch {
    throw new Error('unknown format or non-existent file');
  }
  return 'not file';
};
