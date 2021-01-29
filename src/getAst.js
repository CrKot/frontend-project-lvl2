import _ from 'lodash';

const getAst = (data1, data2) => {
  const keys = _.union(_.keys(data2), _.keys(data1));
  const sortedKeys = _.sortBy(keys);
  const ast = sortedKeys.map((key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];
    if (valueData1 === undefined) {
      return { key, type: 'added', value: valueData2 };
    }
    if (valueData2 === undefined) {
      return { key, type: 'removed', value: valueData1 };
    }
    if (_.isPlainObject(valueData1) && _.isPlainObject(valueData2)) {
      return { key, type: 'nested', children: getAst(valueData1, valueData2) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', deletedValue: valueData1, addedValue: valueData2,
      };
    }
    return { key, type: 'unchanged', value: valueData1 };
  });
  return ast;
};

export default getAst;
