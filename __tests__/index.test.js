import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '/', '__fixtures__', filename);
const getFile = (pathFile) => fs.readFileSync(pathFile, 'utf8');

test('gendiff JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const testExpect = getFile(getFixturePath('filesExpect.json'));
  const result = gendiff(file1, file2);
  expect(result).toEqual(testExpect);
});

test('gendiff YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const testExpect = getFile(getFixturePath('filesExpect.yml'));
  const result = gendiff(file1, file2);
  expect(result).toEqual(testExpect);
});

test('gendiff complex json file', () => {
  const file1 = getFixturePath('complexFile1.json');
  const file2 = getFixturePath('complexFile2.json');
  const testExpect = getFile(getFixturePath('expectComplexFiles.json'));
  const result = gendiff(file1, file2);
  expect(result).toEqual(testExpect);
});
