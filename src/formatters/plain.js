import _ from 'lodash';

const getString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (ast) => {
  const render = (node, path) => {
    const {
      key, type, children, value, addedValue, deletedValue,
    } = node;
    const fullPath = [...path, key];
    if (type === 'added') {
      return `Property '${fullPath.join('.')}' was ${type} with value: ${getString(value)}`;
    }
    if (type === 'removed') {
      return `Property '${fullPath.join('.')}' was removed`;
    }
    if (type === 'nested') {
      const string = (children.flatMap((childrenNode) => render(childrenNode, fullPath))).join('\n');
      return string;
    }
    if (type === 'changed') {
      return `Property '${fullPath.join('.')}' was updated. From ${getString(deletedValue)} to ${getString(addedValue)}`;
    }
    return [];
  };
  return (ast.map((node) => render(node, []))).join('\n');
};
