const express 			= require('express')
	, path				= require('path')
	, expressLayouts 	= require('express-ejs-layouts')
	, morgan 			= require('morgan')
	, mongoose 			= require('mongoose')
	, dotenv 			= require('dotenv')
	, passport			= require('passport')
	, flash 			= require('connect-flash')
	, session 			= require('express-session')
	, indexRouter 		= require('./routes/index')
	, housekeeperRoutes = require('./routes/housekeeper')
	, userRoutes 		= require('./routes/user')
	, bookingRoutes 	= require('./routes/booking')
	, requirementRoutes = require('./routes/requirement')
	, app 				= express();

dotenv.config();

// Passport Config
require('./config/passport')(passport);

// MongoDB
mongoose.connect(process.env.MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() 	=> console.log("Connected To MongoDB"))
.catch(err 	=> console.log(err));

// setting Views folder
app.set('views', __dirname+'/views');

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Logging and url parsing
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true }));

// express session middleware
app.use(session({
	secret: 			'secret',
	resave: 			true,
	saveUninitialized: 	true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global var
app.use(function(req, res, next) {
	res.locals.success_msg 	= req.flash("success_msg");
	res.locals.error_msg 	= req.flash("error_msg");
	res.locals.error 		= req.flash("error");
	next();
});

// setting up for static resources in public folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS is not required as this is no longer a REST API

// Routes
app.use('/', indexRouter);
app.use('/housekeepers', housekeeperRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/requirements', requirementRoutes);

// Error Handling Code
// Not Found Errors
app.use((req, res, next) => {
	const err 	= new Error("Not Found");
	err.status 	= 404;
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
