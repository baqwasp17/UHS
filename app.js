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
app.use('/profile', (req, res, next) => {
	res.render('profile', {
		housekeepers: [{
			_id:				"012345",
			serviceType:		1,
			firstName:			"Whatever",
			lastName:			"Goes",
			gender:				"Female",
			liveIn:				"Yes",
			noOfHoursCanWork: 	8,
			housekeeperAge:		34,
			nativePlace:		"Somewhere I belong",
			location:			"Here",
			verifiedDocs:		['Aadhar', 'Voter\'s ID Card'],
			languages:			['Hindi', 'Japanese', 'English'],
			cleaningService:	{
				bathroomCleaning:		true,
				clothesIroning:			true,
				clothesWashingHand:		true,
				clothesWashingMachine:	true,
				dusting:				true,
				floorCleaning:			true,
				groceryShopping:		true,
				utensilCleaning:		true
			},
			experience:			{
				years:			8,
				description:	["Worked here","Worked there", "Worked Everywhere"],
			},
			picture:	'https://www.gravatar.com/avatar/'+crypto.createHash('md5').update(Math.random().toString(36).substring(7)).digest('hex')+'?s=200&d=robohash'
		},
		{
			_id:				"012346",
			serviceType:		3,
			firstName:			"Monkey D.",
			lastName:			"Luffy",
			gender:				"Male",
			liveIn:				"Yes",
			noOfHoursCanWork: 	8,
			housekeeperAge:		20,
			nativePlace:		"Foosha Village",
			location:			"New World",
			verifiedDocs:		['Aadhar', 'Voter\'s ID Card'],
			languages:			['Japanese', 'Engrish'],
			cleaningService:	{
				bathroomCleaning:		true,
				clothesIroning:			true,
				clothesWashingHand:		true,
				dusting:				true,
				floorCleaning:			true,
				groceryShopping:		true,
				utensilCleaning:		true
			},
			cookingService: {
				nonVeg:				true,
				breakFast:			true,
				lunch:				true,
				dinner:				true,
				foodPreference:		"whatever",
				threeBestDishes:	["niku","niku","niku"]
			},
			experience:			{
				years:			4,
				description:	["Worked as captain of pirate crew on Mary Go","Worked as captain of pirate crew on Thousand Sunny"],
			},

			picture:	'https://www.gravatar.com/avatar/'+crypto.createHash('md5').update(Math.random().toString(36).substring(7)).digest('hex')+'?s=200&d=robohash'
		}],
		user: req.session.user
	});
});
app.use('/bookings', bookingRoutes);
app.use('/requirements', requirementRoutes);
app.use('/', indexRouter);

// Error Handling Code
// Not Found Errors
app.use(errorController.get404);

module.exports = app;
// This is a test
