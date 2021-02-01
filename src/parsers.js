import YAML from 'yaml';

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.parse(data);
    default:
      throw new Error('unknown format or non-existent file');
  }
};
