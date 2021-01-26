import path from 'path';
import getParseFile from './parsers.js';
import getAst from './getAst.js';
import formatter from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const formatFile1 = path.extname(path1);
  const formatFile2 = path.extname(path2);

  const filePath1 = path.resolve(process.cwd(), path1);
  const filePath2 = path.resolve(process.cwd(), path2);

  const parseFile1 = getParseFile(filePath1, formatFile1);
  const parseFile2 = getParseFile(filePath2, formatFile2);
  const ast = getAst(parseFile1, parseFile2);

  return formatter(ast, format);
};
