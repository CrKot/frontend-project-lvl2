import _ from 'lodash';

const getDiff = (file1, file2) => {
  const keys = _.union(_.keys(file2), _.keys(file1));
  const sortedKeys = _.sortBy(keys);
  const ast = sortedKeys.map((key) => {
    const elementFile1 = file1[key];
    const elementFile2 = file2[key];
    if (_.isEqual(elementFile1, elementFile2)) {
      return { key, status: 'unchange', value: elementFile1 };
    }
    if (_.isObject(elementFile1) && _.isObject(elementFile2)) {
      return { key, status: 'pass', children: getDiff(elementFile1, elementFile2) };
    }
    if (elementFile1 !== undefined && elementFile2 !== undefined && elementFile1 !== elementFile2) {
      return {
        key, status: 'update', valueDeleted: elementFile1, valueAdded: elementFile2,
      };
    }
    return elementFile1 === undefined
      ? { key, status: 'added', value: elementFile2 }
      : { key, status: 'removed', value: elementFile1 };
  });
  return ast;
};

export default (pathToFile1, pathToFile2) => getDiff(pathToFile1, pathToFile2);
