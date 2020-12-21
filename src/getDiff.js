import _ from 'lodash';
import getParseFile from './parsers.js';
import getSortedObject from './getSortedObject.js';

const getDiff = (pathToFile1, pathToFile2) => {
  const parseFile1 = getParseFile(pathToFile1);
  const parseFile2 = getParseFile(pathToFile2);
  const sortedFile1 = getSortedObject(parseFile1);
  const sortedFile2 = getSortedObject(parseFile2);
  const uniqKeys = _.uniq(_.keys(sortedFile1).concat(_.keys(sortedFile2)));
  let result = '{\n';
  uniqKeys.map((key) => {
    const newKeyPlus = `  + ${key}`;
    const newKeyMinus = `  - ${key}`;
    const keyDefault = `    ${key}`;
    if (sortedFile1[key] !== undefined && sortedFile2[key]
        && sortedFile1[key] !== sortedFile2[key]) {
      result += `${newKeyMinus}: ${sortedFile1[key]}\n`;
      result += `${newKeyPlus}: ${sortedFile2[key]}\n`;
    }
    if (sortedFile1[key] !== undefined && !sortedFile2[key]) {
      result += `${newKeyMinus}: ${sortedFile1[key]}\n`;
    }
    if (sortedFile1[key] === undefined && sortedFile2[key]) {
      result += `${newKeyPlus}: ${sortedFile2[key]}\n`;
    }
    if (sortedFile1[key] === sortedFile2[key]) {
      result += `${keyDefault}: ${sortedFile2[key]}\n`;
    }
    return result;
  });
  const diffString = result.concat('}');
  return diffString;
};

export default getDiff;
