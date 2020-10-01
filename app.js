const express = require('express');
const ExpressError = require('./errorClass');

const app = express();

app.use(express.json());

app.get('/mean', function(req, res, next) {
  const operation = 'mean';
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
    const value = nums.reduce((acc, n, i) => {
      if (i === nums.length - 1) {
        acc += parseInt(n);
        return acc / nums.length;
      }
      return acc += parseInt(n);
    }, 0)
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.get('/median', function(req, res, next) {
  const operation = 'median';
  const median = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
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
    const value = median(nums);
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