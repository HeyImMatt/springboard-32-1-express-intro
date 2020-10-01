const ExpressError = require('./errorClass');

function validateAndReturnNumsArray(data) {
  if (!data) {
    throw new ExpressError('Nums required', 400);
  };
  const nums = data.split(',').map((n) => {
    if (!parseInt(n)) {
      throw new ExpressError(`${n} is not a number`, 400)
    };
    return parseInt(n);
  });
  return nums;
}

function findMean(nums) {
  return nums.reduce((acc, n, i) => {
    if (i === nums.length - 1) {
      acc += parseInt(n);
      return acc / nums.length;
    }
    return acc += parseInt(n);
  }, 0)
}

function findMedian(arr) {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function createFrequencyCounter(arr) {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

module.exports = {
  validateAndReturnNumsArray,
  findMean,
  findMedian,
  findMode
}