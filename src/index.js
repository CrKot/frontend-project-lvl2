import commander from 'commander';

const gendiff = new commander.Command();

gendiff
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

gendiff.parse(process.argv);

export default gendiff;
