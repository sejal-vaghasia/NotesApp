// routes/noteRoutes.js
'use strict';
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/shared', noteController.sharedWithMe);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/share', noteController.shareNote);

module.exports = router;
