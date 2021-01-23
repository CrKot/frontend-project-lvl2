import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      throw new Error('unknown format');
  }
};
