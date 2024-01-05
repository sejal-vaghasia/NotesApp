// routes/noteRoutes.js
'use strict';
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.searchNotes);

module.exports = router;