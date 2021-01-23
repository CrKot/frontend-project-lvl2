import _ from 'lodash';

const getString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlain = (ast) => {
  const render = (element, path) => {
    const {
      key, status, children, value, valueAdded, valueDeleted,
    } = element;
    const fullPath = [...path, key];
    if (status === 'pass') {
      const string = (children.flatMap((element1) => render(element1, fullPath))).join('\n');
      return string;
    }
    if (status === 'added') {
      return `Property '${fullPath.join('.')}' was ${status} with value: ${getString(value)}`;
    }
    if (status === 'update') {
      return `Property '${fullPath.join('.')}' was updated. From ${getString(valueDeleted)} to ${getString(valueAdded)}`;
    }
    if (status === 'removed') {
      return `Property '${fullPath.join('.')}' was removed`;
    }
    return [];
  };
  return (ast.map((element) => render(element, []))).join('\n');
};

export default (ast) => getPlain(ast);
