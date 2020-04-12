const mongoose 	= require('mongoose')
	, Schema 	= mongoose.Schema;

const cleaningServiceSchema = require('CleaningSerivce.model');
const cookingServiceSchema = require('CookingService.model');
const babySittingServiceSchema = require('BabySittingService.model');
const elderlyCareServiceSchema = require('ElderlyCareService.model');

const verificationSchema = new Schema({
	verified: {type: Boolean, default: false},
	documents: {
		type:String, 
		enum: 
			['Aadhar', 'Voter\'s ID Card', 'PAN Card', ''],
		default: ''
	}
});

const housekeeperSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {type: String, required: [true, "Can't be Blank"]},
	lastName: {type: String, required: [true, "Can't be Blank"]},
	gender: {type: String, required: [true, "Can't be Blank"], enum: ["Male", "Female"]},
	verificationStatus: verificationSchema,
	cleaningService:	{type: cleaningServiceSchema},
	cookingService:		{type: cookingServiceSchema},
	babySittingService:	{type: babySittingServiceSchema},
	elderlyCareService:	{type: elderlyCareServiceSchema},
	experience: {
		type: Object,
		years: {type: Number, default: 0},
		description: {type: String, default: ''},
	},
	picture: {type: String, default: ''},
	minSalary: {type: Number, default: 4000}
});

module.exports = mongoose.model('Housekeeper', housekeeperSchema);
