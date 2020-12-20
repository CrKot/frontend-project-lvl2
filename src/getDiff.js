import _ from 'lodash';
import fs from 'fs';
import getFullPathFile from './getFullPathFile.js';
import getSortedObject from './getSortedObject.js';

const diff = (pathToFile1, pathToFile2) => {
  const [pathFile1, pathFile2] = getFullPathFile([pathToFile1, pathToFile2]);
  const parseFile1 = JSON.parse(fs.readFileSync(pathFile1, 'utf8'));
  const parseFile2 = JSON.parse(fs.readFileSync(pathFile2, 'utf8'));
  const sortedFile1 = getSortedObject(parseFile1);
  const sortedFile2 = getSortedObject(parseFile2);
  const keys = _.keys(sortedFile1).concat(_.keys(sortedFile2));
  const result = {};
  keys.map((key) => {
    if (sortedFile1[key] !== undefined && sortedFile2[key]
        && sortedFile1[key] !== sortedFile2[key]) {
      const newKeyMinus = `- ${key}`;
      const newKeyPlus = `+ ${key}`;
      result[newKeyMinus] = sortedFile1[key];
      result[newKeyPlus] = sortedFile2[key];
    }
    if (sortedFile1[key] !== undefined && !sortedFile2[key]) {
      const newKeyMinus = `- ${key}`;
      result[newKeyMinus] = sortedFile1[key];
    }
    if (sortedFile1[key] === undefined && sortedFile2[key]) {
      const newKeyPlus = `+ ${[key]}`;
      result[newKeyPlus] = sortedFile2[key];
    }
    if (sortedFile1[key] === sortedFile2[key]) {
      result[key] = sortedFile2[key];
    }
    return result;
  });
  return result;
};

export default diff;
