const { validateAndReturnNumsArray, findMean, findMedian, findMode } = require('./helpers');

it('should return valid nums array or throw error', () => {
  expect(validateAndReturnNumsArray('1,2,3')).toEqual([1, 2, 3]);
});

it('should find median', () => {
  expect(findMean([1,2,3,4])).toEqual(2.5);
});

it('should find mean', () => {
  expect(findMean([1,2,3,4,5])).toEqual(3);
});

it('should find mode', () => { 
  expect(findMode([1,1,1,2,2,3])).toEqual(1)
});