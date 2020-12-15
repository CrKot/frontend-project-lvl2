import path from 'path';

const getFullPathFile = (pathFile) => pathFile.map((args) => {
  if (!args.startsWith('/home')) {
    return `${process.cwd()}${path.resolve(args)}`;
  }
  return args;
});

export default getFullPathFile;
