import _ from 'lodash';
import commander from 'commander';
import fs from 'fs';
import getFullPathFile from './getFullPathFile.js';
import getSortedObject from './getSortedObject.js';

const gendiff = new commander.Command();
gendiff
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<pathToFile1> <pathToFile2>')
  .action((pathToFile1, pathToFile2) => {
    const [pathFile1, pathFile2] = getFullPathFile([pathToFile1, pathToFile2]);
    const parseFile1 = JSON.parse(fs.readFileSync(pathFile1, 'utf8'));
    const parseFile2 = JSON.parse(fs.readFileSync(pathFile2, 'utf8'));
    const sortedFile1 = getSortedObject(parseFile1);
    const sortedFile2 = getSortedObject(parseFile2);

    const diff = (data1, data2) => {
      const keys = _.keys(data1).concat(_.keys(data2));
      const result = {};
      keys.map((key) => {
        if (data1[key] !== undefined && data2[key] && data1[key] !== data2[key]) {
          const newKeyMinus = `- ${key}`;
          const newKeyPlus = `+ ${key}`;
          result[newKeyMinus] = data1[key];
          result[newKeyPlus] = data2[key];
        }
        if (data1[key] !== undefined && !data2[key]) {
          const newKeyMinus = `- ${key}`;
          result[newKeyMinus] = data1[key];
        }
        if (data1[key] === undefined && data2[key]) {
          const newKeyPlus = `+ ${[key]}`;
          result[newKeyPlus] = data2[key];
        }
        if (data1[key] === data2[key]) {
          result[key] = data2[key];
        }
        return result;
      });
      return result;
    };
    return diff(sortedFile1, sortedFile2);
  });

export default gendiff;
