import YAML from 'yaml';

export default (file, formatFile) => {
  switch (formatFile) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return YAML.parse(file);
    default:
      throw new Error('unknown format or non-existent file');
  }
};
