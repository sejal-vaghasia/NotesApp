// models/SharedNotes.js
'use strict';
const mongoose = require('mongoose');

const sharedNotesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notes' },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SharedNotes', sharedNotesSchema);
