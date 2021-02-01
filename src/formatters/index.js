import stylish from './stylish.js';
import plain from './plain.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return JSON.stringify(ast, null, 2);
    default:
      throw new Error('unknown format');
  }
};
