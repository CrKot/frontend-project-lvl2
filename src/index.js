import getParseFile from './parsers.js';
import getDiff from './getDiff.js';
import formatter from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const parseFile1 = getParseFile(path1);
  const parseFile2 = getParseFile(path2);
  const ast = getDiff(parseFile1, parseFile2);

  return formatter(ast, format);
};
