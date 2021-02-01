import _ from 'lodash';

const getString = (value) => {
  if (_.isObject(value)) {
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

    switch (type) {
      case 'added':
        return `Property '${fullPath.join('.')}' was ${type} with value: ${getString(value)}`;
      case 'removed':
        return `Property '${fullPath.join('.')}' was removed`;
      case 'nested':
        return (children.flatMap((childrenNode) => render(childrenNode, fullPath))).join('\n');
      case 'changed':
        return `Property '${fullPath.join('.')}' was updated. From ${getString(deletedValue)} to ${getString(addedValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`unknown type node => ${type}`);
    }
  };

  return (ast.map((node) => render(node, []))).join('\n');
};
