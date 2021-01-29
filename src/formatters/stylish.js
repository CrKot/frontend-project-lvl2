import _ from 'lodash';

const sign = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
};

const getIndent = {
  open: (counter) => '  '.repeat(counter),
  close: (counter) => '  '.repeat(counter - 1),
};
const getStringify = (value, counter, render) => {
  if (!_.isPlainObject(value)) {
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
    if (type === 'nested') {
      const string = children.flatMap((childrenNode) => render(childrenNode, counter + 2));
      return `${currenIndent}${sign[type]}${key}: {\n${string.join('\n')}\n${closeIndent}}`;
    }
    if (type !== 'changed') {
      return [`${currenIndent}${sign[type]}${key}: ${getStringify(value, counter, render)}`];
    }
    if (type === 'changed') {
      return [`${currenIndent}${sign.removed}${key}: ${getStringify(deletedValue, counter, render)}`,
        `${currenIndent}${sign.added}${key}: ${getStringify(addedValue, counter, render)}`].join('\n');
    }
    return [`${currenIndent}${sign[type]}${key}: ${getStringify(value, counter, render)}`];
  };
  const string = ast.map((node) => render(node, initialСounter + 1));
  return `{\n${string.join('\n')}\n}`;
};
