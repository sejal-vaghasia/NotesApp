// middlewares/rateLimiting.js
'use strict';
const rateLimit = require('express-rate-limit');
const RATE_LIMIT = process.env.RATE_LIMIT;
const THROTTLE_LIMIT = process.env.THROTTLE_LIMIT;

// rate limiting and request throttling to handle high traffic
const limiter = rateLimit({
  windowMs: THROTTLE_LIMIT * 60 * 1000,
  max: RATE_LIMIT, // limit each IP to RATE_LIMIT requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

module.exports = limiter;
