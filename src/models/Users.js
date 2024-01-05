// models/Users.js
'use strict';
const mongoose = require('mongoose');
var bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true, required: true },
  password: { type: String },
  created: { type: Date, default: Date.now }
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);;
};

// will encrypt password everytime it is saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model('Users', userSchema);
