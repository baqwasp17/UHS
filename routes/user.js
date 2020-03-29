const express 	= require('express')
	, router 	= express.Router()
	, User 		= require('../models/User.model')
	, passport 	= require('passport');

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res, next) => {
	res.render('login');
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res, next) => {
	res.render('register');
});

// Register
router.post('/register', (req, res, next) => {
	const { name, email, password, password2 } = req.body;
	console.log(req.body);
	let errors = [];

	// Check required fields
	if(!name || !email || !password || !password2) {
		errors.push({msg: "Please fill in required fields"});
	}

	// Check passwords match
	if(password != password2) {
		error.push({msg: "Password do not match"});
	}

	if(password.length < 6) {
		errors.push({msg: "Password should be at least 6 characters"});
	}

	if(errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		User.findOne({email : email})
		.then(user => {
			if(user) {
				errors.push({msg: "Email is already registered"});
				res.render('register', {
					errors,
					name,
					email,
					password,
					password2
				});
			}
			else {
				const newUser = new User({name, email, password});
				console.log(newUser);
				newUser.save()
				.then(result =>{
					req.flash('success_msg', 'You are now registered and can login');
					res.redirect('/users/login');
				})
				.catch(err => console.log(err));
			}
		})
		.catch(err => console.log(err));
		// Validation Passed
	}
});

// Login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: 	'/dashboard',
		failureRedirect: 	'/users/login',
		failureFlash: 		true
	})(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	req.redirect('/users/login');
});

/*PROTECTED*/
router.patch('/:userId', (req, res, next) =>{
	const userId = req.params.userId;
});

/*PROTECTED*/
router.delete('/:userId', (req, res, next) => {
	const userId = req.params.userId;
});

module.exports = router;
