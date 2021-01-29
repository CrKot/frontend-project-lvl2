import path from 'path';
import fs from 'fs';
import parseFile from './parsers.js';
import getAst from './getAst.js';
import formatter from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const formatFile1 = path.extname(path1);
  const formatFile2 = path.extname(path2);

  const filePath1 = path.resolve(process.cwd(), path1);
  const filePath2 = path.resolve(process.cwd(), path2);

  const readFile1 = fs.readFileSync(filePath1, 'utf8');
  const readFile2 = fs.readFileSync(filePath2, 'utf8');

  const data1 = parseFile(readFile1, formatFile1);
  const data2 = parseFile(readFile2, formatFile2);
  const ast = getAst(data1, data2);

  return formatter(ast, format);
};
