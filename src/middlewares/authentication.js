// middlewares/authentication.js
'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const JWT_SECRET = process.env.JWT_SECRET;
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// check if user is authenticated or not.
exports.authenticateUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(200).json({ status: 401, message: "You are not authorized to make request, token failed" });
    }
  }

  if (!token) {
    res.status(200).json({ status: 401, message: "You are not authorized to make request, token failed" });
  }
}

// Generated JWT Token aafter login
exports.generateToken = (userData) => {
  return jwt.sign(userData, JWT_SECRET, {
    expiresIn: "30d",
  })
};
// Check if email is a valid email
exports.isEmailValid = async (email) => {
  if (!email)
    return false;

  if (email.length > 254)
    return false;

  var valid = emailRegex.test(email);
  if (!valid)
    return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64)
    return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some(function (part) { return part.length > 63; }))
    return false;

  return true;
}
