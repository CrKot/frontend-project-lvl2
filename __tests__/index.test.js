import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '/', '__fixtures__', filename);
const readFile = (pathFile) => fs.readFileSync(pathFile, 'utf8');
const expectPlain = readFile(getFixturePath('expectPlain.txt'));
const expectStylish = readFile(getFixturePath('expectRecursionTree.txt'));
const recursionTree1Yml = getFixturePath('recursionTreeFile1.yml');
const recursionTree2Yml = getFixturePath('recursionTreeFile2.yml');
const recursionTree1Json = getFixturePath('complexFile1.json');
const recursionTree2Json = getFixturePath('complexFile2.json');

describe('gendiff', () => {
  test.each`
          file1         |        file2         | format       | expectResult    | message
  ${recursionTree1Json} |${recursionTree2Json} | ${'stylish'} | ${expectStylish}| ${'JSON stylish'}
  ${recursionTree1Json} |${recursionTree2Json} | ${'plain'}   | ${expectPlain}  | ${'JSON plain'}
  ${recursionTree1Yml}  |${recursionTree2Yml}  | ${'stylish'} | ${expectStylish}| ${'Yml stylish'}
  ${recursionTree1Yml}  |${recursionTree2Yml}  | ${'plain'}   | ${expectPlain}  | ${'Yml plain'}
`('$message',
    ({
      file1, file2, format, expectResult,
    }) => {
      expect(gendiff(file1, file2, format)).toEqual(expectResult);
    });
});
