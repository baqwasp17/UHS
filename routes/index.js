const express 			= require('express');
const booking			= require('../models/Booking.model.js');
const router 			= express.Router();
const authenticate 		= require('../middleware/Auth.js');
const indexController 	= require('../controllers/Index.controller.js')
const nodemailer		= require('nodemailer');
const dotenv			= require('dotenv');
const sendgridTransport	= require('nodemailer-sendgrid-transport');

dotenv.config();
const transporter 		= nodemailer.createTransport(sendgridTransport({
	auth: {
		api_key: process.env.SENDGRID_APIKEY
	}
}));

// Welcome Page
router.get('/', indexController.getWelcome);

// services temp
router.get('/services', indexController.getServices);

router.get('/successbooking', authenticate, (req, res, next) => {
	let bookingId = req.session.bookingId;
	console.log(bookingId);
	delete req.session.bookingId;
	console.log(bookingId);
	transporter.sendMail({
		to: req.session.user.email,
		from: 'artand1997@gmail.com',
		subject: 'Successful Booking',
		html: `
		<div>
<h1 
style="text-align:center;font-family:Helvetica;font-weight:300">
Thank you for hiring from <span style="font-weight:19px;font-size=larger">U<span style="color:cyan;">HS</span></span></h1>
<pre style="text-align:center;font-family:Helvetica;font-size:25px">
Booking Done Successfully,
Booking ID: ${bookingId}
Our team will contact you shortly to discuss joining details and
availability of the housekeeper.
</pre>
</div>
		`
	});
	res.render('checkoutsuccess', {bookingId: bookingId});
});

router.get('/cancelbooking', authenticate, (req, res, next) => {
	let bookingId = req.session.bookingId;
	delete req.session.bookingId;
	Booking.findOneAndDelete({_id: bookingId})
	.then(result => {
		res.redirect('/requirements/dashboard');
	})
	.catch(err => {
		console.log(err);
	});
});

// Dashboard
/*PROTECTED*/
router.get('/dashboard', authenticate, indexController.getDashboard);

module.exports = router;
