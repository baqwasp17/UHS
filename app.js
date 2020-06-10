const express 			= require('express');
const dotenv 			= require('dotenv');
const engine			= require('ejs-mate');
const bodyParser 		= require('body-parser');
const flash 			= require('connect-flash');
const morgan 			= require('morgan');
const mongoose			= require('mongoose');
const path				= require('path');
const crypto			= require('crypto');
const cookieParser		= require('cookie-parser');
const session 			= require('express-session');
const MongoDBStore		= require('connect-mongodb-session')(session);
const requirementRoutes = require('./routes/requirement.js');
const housekeeperRoutes = require('./routes/housekeeper.js');
const userRoutes 		= require('./routes/user.js');
const bookingRoutes 	= require('./routes/booking.js');
const indexRouter 		= require('./routes/index.js');
const errorController	= require('./controllers/Error.controller.js');
const authenticate		= require('./middleware/Auth.js');
const app 				= express();


const store = new MongoDBStore({
	uri: process.env.MONGOURI,
	collection: 'UHSSessions'
});
dotenv.config();

// MongoDB
mongoose.connect(process.env.MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() 	=> console.log("Connected To MongoDB"))
.catch(err 	=> console.log(err));

// setting Views folder
app.set('views', __dirname+'/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Logging, url, json, cookie parsing etc
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session middleware
app.use(session({
	secret: 			process.env.SESSION_SECRET || 'secret',
	resave: 			false,
	saveUninitialized: 	false,
	store:				store
}));

// Connect flash
app.use(flash());

// Routes
app.use('/index', indexRouter);
app.use('/housekeepers', housekeeperRoutes);
app.use('/users', userRoutes);
app.use('/successbooking', indexRouter);
app.use('/bookings', bookingRoutes);
app.use('/requirements', requirementRoutes);
app.use('/', indexRouter);

// Error Handling Code
// Not Found Errors
app.use(errorController.get404);

module.exports = app;
// This is a test
