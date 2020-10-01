const express = require('express');
const { validateAndReturnNumsArray, findMean, findMedian, findMode } = require('./helpers');

const app = express();

app.use(express.json());

app.get('/mean', function(req, res, next) {
  const operation = 'mean';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums);
    const value = findMean(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.get('/median', function(req, res, next) {
  const operation = 'median';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums);
    const value = findMedian(nums);
    return res.json({operation, value});
  } catch(e) {
    return next(e);
  }
});

app.get('/mode', function(req, res, next) {
  const operation = 'mode';
  try {
    const nums = validateAndReturnNumsArray(req.query.nums);
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