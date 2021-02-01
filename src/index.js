import path from 'path';
import fs from 'fs';
import parseFile from './parsers.js';
import getAst from './ast.js';
import formatter from './formatters/index.js';

const getFormat = (filePath) => path.extname(filePath).replace('.', '').toLowerCase();

const getData = (filePath) => parseFile(
  fs.readFileSync(filePath, 'utf-8'),
  getFormat(filePath),
);

export default (path1, path2, format = 'stylish') => {
  const data1 = getData(path1);
  const data2 = getData(path2);

  const ast = getAst(data1, data2);

  return formatter(ast, format);
};
