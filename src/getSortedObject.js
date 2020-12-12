import _ from 'lodash';

const getSortedObject = (obj) => {
  const sortedToPairs = _.toPairs(obj).sort();
  return _.fromPairs(sortedToPairs);
};

export default getSortedObject;
