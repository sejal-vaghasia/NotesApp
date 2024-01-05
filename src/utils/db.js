// utils/db.js
'use strict';
const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST;
const db = mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database Connected")
  })
  .catch((err) => {
    console.error.bind(err, 'MongoDB connection error:')
    return err
  });
module.exports = db;
