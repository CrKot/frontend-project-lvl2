import _ from 'lodash';

const sign = {
  added: '+ ',
  removed: '- ',
  unchange: '  ',
  pass: '  ',
};

const getIndent = {
  open: (count) => '  '.repeat(count),
  close: (count) => '  '.repeat(count - 1),
};
const getStringify = (value, count, render) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const string = _.keys(value)
    .flatMap((key) => {
      const unchangedDiff = { key, status: 'unchange', value: value[key] };
      return render(unchangedDiff, count + 2);
    });
  return `{\n${string.join('\n')}\n${getIndent.close(count + 2)}}`;
};

const getStylish = (data1, count1) => {
  const render = (ast, count) => {
    const {
      key, status, value, valueAdded, valueDeleted, children,
    } = ast;
    const currenIndent = getIndent.open(count);
    const closeIndent = getIndent.close(count + 2);
    if (status === 'pass') {
      const string = children.flatMap((node) => render(node, count + 2));
      return `${currenIndent}${sign[status]}${key}: {\n${string.join('\n')}\n${closeIndent}}`;
    }
    if (status !== 'update') {
      return [`${currenIndent}${sign[status]}${key}: ${getStringify(value, count, render)}`];
    }
    if (status === 'update') {
      return [`${currenIndent}${sign.removed}${key}: ${getStringify(valueDeleted, count, render)}`,
        `${currenIndent}${sign.added}${key}: ${getStringify(valueAdded, count, render)}`].join('\n');
    }
    return [`${currenIndent}${sign[status]}${key}: ${getStringify(value, count, render)}`];
  };
  const string = data1.map((node) => render(node, count1 + 1));
  return `{\n${string.join('\n')}\n}`;
};

export default (ast) => getStylish(ast, 0);
