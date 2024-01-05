// app.js
'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config()
const db = require('./src/utils/db');
const authRoutes = require('./src/routes/authRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const { authenticateUser } = require('./src/middlewares/authentication');
const limiter = require('./src/middlewares/rateLimiting');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Apply rate limiting middleware
app.use(limiter);

// Connect routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', authenticateUser, noteRoutes);
app.use('/api/search', authenticateUser, searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});
