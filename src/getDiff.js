import _ from 'lodash';
import getParseFile from './parsers.js';
import getJsonTree from './getJsonTree.js';

const getDiff = (pathToFile1, pathToFile2) => {
  const parseFile1 = getParseFile(pathToFile1);
  const parseFile2 = getParseFile(pathToFile2);
  const uniqKeys = (key1, key2) => _.uniq(_.keys(key1).concat(_.keys(key2)));
  const diff = (file1, file2) => {
    const keys = (uniqKeys(file1, file2)).sort();
    const ast = keys.reduce((acc, key) => {
      const result = { key };
      // if (_.isObject(file1[key])) {
      //   result.children = file2[key] ? diff(file1[key], file2[key]) : _.cloneDeep(file1[key]);
      // }
      // if (_.isObject(file2[key])) {
      //   result.children = file1[key] ? diff(file1[key], file2[key]) : _.cloneDeep(file2[key]);
      // }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        result.status = 'unchanged';
        result.children = diff(file1[key], file2[key]);
        acc.push(result);
        return acc;
      }
      if (file1[key] !== undefined && file2[key] !== undefined
        && file1[key] !== file2[key]) {
        result.status = 'changed';
        result.valueFile = file1[key];
        result.valueFile2 = file2[key];
      }
      if (file1[key] !== undefined && file2[key] === undefined) {
        result.status = 'removed';
        result.valueFile = file1[key];
      }
      if (file1[key] === undefined && file2[key] !== undefined) {
        result.status = 'added';
        result.valueFile = file2[key];
      }
      if (file1[key] === file2[key]) {
        result.status = 'unchanged';
        result.valueFile = file2[key];
      }
      acc.push(result);
      return acc;
    }, []);
    return ast;
  };
  const test1 = diff(parseFile1, parseFile2);
  //  console.log(JSON.stringify(test1, null, 4))
  return getJsonTree(test1);
};

export default getDiff;
