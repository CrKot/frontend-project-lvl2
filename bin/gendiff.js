#!/usr/bin/env node

import commander from 'commander';
import getDiff from '../index.js';

const gendiff = new commander.Command();
gendiff
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<pathToFile1> <pathToFile2>')
  .action((pathToFile1, pathToFile2) => {
    const diffTo2Files = getDiff(pathToFile1, pathToFile2, gendiff.opts().format);
    console.log(diffTo2Files);
    return diffTo2Files;
  });

gendiff.parse(process.argv);
