const mongoose 	= require('mongoose')
	, Schema 	= mongoose.Schema;

const cleaningServiceSchema = require('./CleaningService.model.js');
const cookingServiceSchema = require('./CookingService.model.js');
const babySittingServiceSchema = require('./BabySittingService.model.js');
const elderlyCareServiceSchema = require('./ElderlyCareService.model.js');

const housekeeperSchema = new Schema({
	_id:				mongoose.Schema.Types.ObjectId,
	serviceType:		{type: Number},
	firstName: 			{type: String, required: [true, "Can't be Blank"]},
	lastName: 			{type: String, required: [true, "Can't be Blank"]},
	gender: 			{type: String, required: [true, "Can't be Blank"], enum: ["Male", "Female"]},
	noOfHoursCanWork:	{type: Number, default: 4},
	housekeeperAge:		{type: Number},
	liveIn:				{type: Boolean},
	nativePlace:		{type: String},
	location:			{type: String},
	verifiedDocs: 		[{type: String, enum: ['Aadhar', 'Voter\'s ID Card', 'PAN Card', 'Bank Account']}],
	languages:			[{type: String}],
	cleaningService:	{type: cleaningServiceSchema},
	cookingService:		{type: cookingServiceSchema},
	babySittingService:	{type: babySittingServiceSchema},
	elderlyCareService:	{type: elderlyCareServiceSchema},
	experience: {
		type: Object,
		years: {type: Number},
		description: [{type: String}],
	},
	picture: {type: String},
});

housekeeperSchema.pre('save', function() {
	const md5 = crypto
	.createHash('md5')
	.update(this.firstName + this.lastName)
	.digest('hex');

	return 'https://www.gravatar.com/avatar/'+md5+'?s=200&d=robohash';
});

module.exports = mongoose.model('Housekeeper', housekeeperSchema);
