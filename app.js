const express = require('express');
const ExpressError = require('./errorClass');

const app = express();

app.use(express.json());

app.get('/mean', function(req, res, next) {
  try {
    const operation = 'mean';
    if (!req.query.nums) {
      throw new ExpressError('Nums required', 400);
    }
    const nums = req.query.nums.split(',');
    const value = nums.reduce((acc, n, i) => {
      if (!parseInt(n)) {
        throw new ExpressError(`${n} is not a number`, 400)
      };
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