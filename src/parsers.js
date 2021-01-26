import fs from 'fs';
import YAML from 'yaml';

export default (filePath, formatFile) => {
  switch (formatFile) {
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    case '.yml':
      return YAML.parse(fs.readFileSync(filePath, 'utf8'));
    default:
      throw new Error('unknown format or non-existent file');
  }
};
