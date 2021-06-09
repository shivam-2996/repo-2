const express = require('express');
const route = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
route.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
route.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = route;
