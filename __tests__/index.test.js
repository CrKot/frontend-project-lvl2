import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '/', '__fixtures__', filename);
const getFile = (pathFile) => fs.readFileSync(pathFile, 'utf8');

const recursionTree1Yml = getFixturePath('recursionTreeFile1.yml');
const recursionTree2Yml = getFixturePath('recursionTreeFile2.yml');

test('gendiff JSON format Stylish', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const testExpect = getFile(getFixturePath('filesExpect.json'));
  const result = gendiff(file1, file2);

  expect(result).toEqual(testExpect);
});

test('gendiff YAML format Stylishs', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const testExpect = getFile(getFixturePath('filesExpect.yml'));
  const result = gendiff(file1, file2);

  expect(result).toEqual(testExpect);
});

test('gendiff recursion format Stylish', () => {
  const file1 = getFixturePath('complexFile1.json');
  const file2 = getFixturePath('complexFile2.json');
  const testExpect = getFile(getFixturePath('expectComplexFiles.json'));
  const result = gendiff(file1, file2);

  expect(result).toEqual(testExpect);
});

test('gendiff recursion YAML format Stylish', () => {
  const testExpect = getFile(getFixturePath('expectRecursionTree.yml'));
  const result = gendiff(recursionTree1Yml, recursionTree2Yml);

  expect(result).toEqual(testExpect);
});

test('gendiff recursion JSON format Plain', () => {
  const testExpect = getFile(getFixturePath('expectPlain.txt'));
  const result = gendiff(recursionTree1Yml, recursionTree2Yml, 'plain');

  expect(result).toEqual(testExpect);
});

test('JSON format', () => {
  const testExpect = getFile(getFixturePath('jsonComplexExpected.json'));
  const result = gendiff(recursionTree1Yml, recursionTree2Yml, 'json');

  expect(result).toEqual(testExpect);
});
