import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '/', '__fixtures__', filename);
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const result = gendiff(file1, file2);
const testExpect = {
  '- follow': false,
  host: 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};
test('gendiff', () => {
  expect(result).toEqual(testExpect);
});
