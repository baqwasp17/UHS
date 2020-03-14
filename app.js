const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const housekeeperRoutes = require('./api/routes/housekeeper');
const userRoutes = require('./api/routes/user');
const bookingRoutes = require('./api/routes/booking');
const requirementRoutes = require('./api/routes/requirement');

mongoose.connect(process.env.MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers', 
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if(req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

app.use('/housekeepers', housekeeperRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/requirements', requirementRoutes);

// Error Handling Code
// Not Found Errors
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Server Errors
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

module.exports = app;
