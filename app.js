const express = require('express');
const ExpressError = require('./errorClass');
const { validateAndReturnNumsArray, findMean, findMedian } = require('./helpers');

const app = express();

app.use(express.json());

app.get('/mean', function(req, res, next) {
  const operation = 'mean';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums)
    const value = findMean(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.get('/median', function(req, res, next) {
  const operation = 'median';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums)
    const value = findMedian(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.get('/mode', function(req, res, next) {
  const operation = 'mode';
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
  try {
    if (!req.query.nums) {
      throw new ExpressError('Nums required', 400);
    }
    const nums = req.query.nums.split(',').map((n) => {
      if (!parseInt(n)) {
        throw new ExpressError(`${n} is not a number`, 400)
      };
      return parseInt(n);
    });
    const value = findMode(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
})