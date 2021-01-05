import _ from 'lodash';

const getTree = (ast) => {
  const render = (data, count) => {
    let indent = '  ';
    if (count > 1) {
      for (let i = 1; i <= count; i += 1) {
        indent += '  ';
      }
    }
    const { key, status, children } = data;
    if (status === 'changed') {
      const test = children ? `${indent}+ ${key}: ${stringResult(children, count + 1)}
        \n${indent}}` : `${indent}- ${key}: ${data.valueFile}
${indent}+ ${data.key}: ${data.valueFile2}\n`; // исправить строку
      return test;
    }
    if (status === 'added') {
      const test = children ? `${indent}+ ${key}: ${stringResult(children, count + 1)}
         \n${indent}}` : `${indent}+ ${key}: ${data.valueFile}\n`;
      return test;
    }
    if (status === 'removed') {
      const test = children ? `${indent}- ${key}: ${stringResult(children, count + 1)}
        \n${indent}}` : `${indent}- ${key}: ${data.valueFile}\n`;
      return test;
    }
    if (status === 'unchanged') {
      const test = children ? `${indent}  ${key}: ${stringResult(children, count + 1)}
        \n${indent}}` : `${indent}  ${key}: ${data.valueFile}\n`;
      return test;
    }
  };
  const stringResult = (obj, count = 1) => {
    if (obj.length > 1) {
      return obj.reduce((acc, data) => `${acc}${render(data, count)}`, '{\n');
    }
    return `${render(obj, count)}`;
  };
  // console.log(stringResult(ast))
  return `${stringResult(ast)}}`;
};

export default getTree;

// `{\n
//   ${render(conunt + 1, children)}
//   \n}}`