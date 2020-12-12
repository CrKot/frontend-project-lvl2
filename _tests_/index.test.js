import { test, expect } from '@jest/globals';

import gendiff from '../src/index.js';

test('gendiff', () => {
  const testExpect = {
    '- follow': false,
    host: 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  const genDiff = gendiff('/data/file1.json', '/data/file2.json');
  console.log(genDiff);
  expect(genDiff).toEqual(testExpect);
});
