// controllers/authController.js
'use strict';
var mongoose = require('mongoose')
const User = require('../models/Users');
const authentication = require('../middlewares/authentication');

//@description     Signup user
//@route           GET /api/auth/signup
exports.signup = async (req, res) => {
  try {
    var newUser = new User(req.body);
    if (!newUser.username || !newUser.email || !newUser.password) {
      res.status(200).json({ status: 400, message: 'Please provide Username, Email and Password', data: {} });
    }
    else {
      var isValidEmail = await authentication.isEmailValid(newUser.email)
      if (!isValidEmail) {
        res.status(200).json({ status: 400, message: 'Please provide valid Email', data: {} });
      } else {
        var userExist = await User.findOne({ email: newUser.email });
        if (!userExist) {
          await newUser.save().then(function (user) {

            user.password = undefined;
            return res.status(200).send({
              status: 201,
              message: "SignUp Successfully",
              data: {
                "username": user.username,
                "email": user.email
              }
            });
          });
        } else {
          res.status(200).json({ status: 400, message: 'Email already in use', data: {} });
        }
      }
    }
  } catch (error) {
    console.log("error :", error)
    return res.status(200).json({ status: 400, message: 'Something went wrong', data: {} });
  }
};

//@description     Login user
//@route           GET /api/auth/login
exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(200).json({ status: 400, message: 'Please provide Email and Password', data: {} });
      return;
    }
    else {
      User.findOne({
        email: req.body.email
      }).then(function (user) {
        if (!user || !user.comparePassword(req.body.password)) {
          res.status(200).json({ status: 401, message: 'Authentication failed. Invalid user or password.', data: {} });
        }
        else {
          var userDetails = {
            "username": user.username,
            "email": user.email,
            "token": authentication.generateToken({ email: user.email, _id: user._id })
          }
          res.status(200).json({ status: 200, message: 'Login Successfully', data: userDetails });
        }
      })
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: 'Something went wrong', data: {} });
  };
}