const crypto			= require('crypto');
const User 				= require('../models/User.model.js');
const bcrypt			= require('bcryptjs');
const nodemailer		= require('nodemailer');
const dotenv			= require('dotenv');
const sendgridTransport	= require('nodemailer-sendgrid-transport');

dotenv.config();
const transporter 		= nodemailer.createTransport(sendgridTransport({
	auth: {
		api_key: process.env.SENDGRID_APIKEY
	}
}));

exports.getLogin = (req, res, next) => {
	res.render('login', {
		errorMessage: 	req.flash('error'),
		successMessage: req.flash('success'),
		infoMessage:	req.flash('info')
	});
};

exports.postLogin = (req, res, next) => {
	console.log("Whatever "+req.body.remember);
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({email: email})
	.then(user => {
		if(!user) {
			req.flash('error', 'Invalid Email or Password');
			return res.redirect('/users/login');
		}
		bcrypt
		.compare(password, user.password)
		.then(result => {
			if(result) {
				req.session.isLoggedIn = true;
				req.session.user = user;
				return req.session.save(err => {
					console.log("session save error");
					console.log(err);
					res.redirect('/');
				});
			}
			req.flash('error', 'Invalid email or password.');
			res.redirect('/users/login');
		})
		.catch(err => {
			console.log("bcrypt error");
			console.log(err);
			req.redirect('/users/login');
		})
	})
	.catch(err => {
		console.log("user find error");
		console.log(err);
	});
};

exports.getRegister = (req, res, next) => {
	res.render('register', {
		errorMessage: req.flash('error'),
	});
};

exports.postRegister = (req, res, next) => {
	const {name, email, password, password2} = req.body;

	User.findOne({email: email})
	.then(userDoc => {
		if(userDoc) {
			req.flash('error', 'E-Mail already registered');
			return res.redirect('/users/register');
		}
		const user = new User({name, email, password});
		user.save();
	})
	.then(result => {
		req.flash('success', 'Registration successful login with you credentials');
		res.redirect('/users/login');
		return transporter.sendMail({
			to: email,
			from: 'artand1997@gmail.com',
			subject: 'Signup succeded!',
			html: '<h3>Welcome '+name+'</h3><br/><p>Thanks for registering on UHS</p>'
		});
	})
	.catch(err => {
		console.log(err);
	});
};

exports.getLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if(err) {
			console.log(err);
			return res.redirect('/users/login');
		}
		const token = buffer.toString('hex');
		User.findOne({email: req.body.email})
		.then(user => {
			if(!user) {
				console.log(user);
				req.flash('error', 'Email not Registered');
				return res.redirect('/users/login');
			}
			user.resetToken = token;
			user.resetTokenExpiration = Date.now() + 3600000;// expires in 1hr
			return user.save();
		})
		.then(result => {
			res.redirect("/");
			return transporter.sendMail({
				to: req.body.email,
				from: 'artand1997@gmail.com',
				subject: 'Password Reset',
				html: `
					<p>You requested a Password Reset</p>
					<p> Click this <a
					href="http://localhost:3000/users/reset/${token}">link</a> to
					reset your password.</p>
				`
			});
		})
		.catch(err => console.log(err));
	});
}

exports.getReset = (req, res, next) => {
	const token = req.params.token;
	User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
	.then(user => {
		res.render('resetpass', {
			errorMessage: req.flash('error'),
			successMessage: req.flash('success'),
			userId: user._id.toString(),
			passwordToken: token
		});
	})
	.catch(err => console.log(err));
}

exports.postNewPassword = (req, res, next) => {
	const newPassword = req.body.password;
	const userId = req.body.userId;
	const passwordToken = req.body.passwordToken;

	User.findOne({
		resetToken: passwordToken,
		resetTokenExpiration: {$gt: Date.now()},
		_id: userId
	})
	.then(user => {
		user.password = newPassword;
		user.resetToken = null;
		user.resetTokenExpiration = undefined;
		return user.save();
	})
	.then(result => {
		res.redirect('/users/login');
	})
	.catch(err => {
		console.log(err);
	});
}

exports.patchUser = (req, res, next) => {
	const userId = req.params.userId;
};

exports.deleteUser = (req, res, next) => {
	const userId = req.params.userId;
};
