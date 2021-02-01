import _ from 'lodash';

const getIndent = {
  open: (counter) => '  '.repeat(counter),
  close: (counter) => '  '.repeat(counter - 1),
};
const getStringify = (value, counter, render) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const string = keys.flatMap((key) => {
    const newNode = { key, type: 'unchanged', value: value[key] };
    return render(newNode, counter + 2);
  });

  return `{\n${string.join('\n')}\n${getIndent.close(counter + 2)}}`;
};

export default (ast, initialСounter = 0) => {
  const render = (node, counter) => {
    const {
      key, type, value, addedValue, deletedValue, children,
    } = node;
    const currenIndent = getIndent.open(counter);
    const closeIndent = getIndent.close(counter + 2);

    switch (type) {
      case 'nested': {
        const string = children.flatMap((childrenNode) => render(childrenNode, counter + 2));
        return `${currenIndent}  ${key}: {\n${string.join('\n')}\n${closeIndent}}`;
      }
      case 'changed':
        return [`${currenIndent}- ${key}: ${getStringify(deletedValue, counter, render)}`,
          `${currenIndent}+ ${key}: ${getStringify(addedValue, counter, render)}`].join('\n');
      case 'added':
        return [`${currenIndent}+ ${key}: ${getStringify(value, counter, render)}`];
      case 'removed':
        return [`${currenIndent}- ${key}: ${getStringify(value, counter, render)}`];
      case 'unchanged':
        return [`${currenIndent}  ${key}: ${getStringify(value, counter, render)}`];
      default:
        throw new Error(`unknown type node => ${type}`);
    }
  };

  const stylishFormat = ast.map((node) => render(node, initialСounter + 1));
  return `{\n${stylishFormat.join('\n')}\n}`;
};
