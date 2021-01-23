import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

export default (file) => {
  const format = path.extname(file);
  const pathFile = path.resolve(process.cwd(), file);
  switch (format) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    case '.yml':
      return YAML.parse(fs.readFileSync(pathFile, 'utf8'));
    default:
      throw new Error('unknown format or non-existent file');
  }
};
