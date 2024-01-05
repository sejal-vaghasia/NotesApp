// models/Notes.js
'use strict';
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, index: true },
  content: { type: String, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  created: { type: Date, default: Date.now }
});
// Created index for each field to user it in search
noteSchema.index({ title: 'text', content: 'text' })
module.exports = mongoose.model('Notes', noteSchema);
