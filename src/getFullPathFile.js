import path from 'path';

const getFullPathFile = (pathFile) => {
  if (!pathFile.startsWith('/home')) {
    return `${process.cwd()}${path.resolve(pathFile)}`;
  }
  return pathFile;
};

export default getFullPathFile;
