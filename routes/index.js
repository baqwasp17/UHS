const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated,  (req, res, next) => {
	res.render('welcome');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
	res.render('dashboard', {
		user: req.user
	})
});

module.exports = router;
