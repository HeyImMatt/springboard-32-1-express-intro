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

module.exports = {
  validateAndReturnNumsArray,
  findMean,
}