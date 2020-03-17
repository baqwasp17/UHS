const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
// Login Page
router.get('/login', (req, res, next) => {
	res.render('login');
});

// Register Page
router.get('/register', (req, res, next) => {
	res.render('register');
});

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
				.then(result => console.log(result))
				.catch(err => console.log(err));
			}
		})
		.catch(err => console.log(err));
		// Validation Passed
	}
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
