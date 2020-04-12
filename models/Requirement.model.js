const mongoose = require('mongoose');
const cleaningServiceSchema = require('CleaningSerivce.model');
const cookingServiceSchema = require('CookingService.model');
const babySittingServiceSchema = require('BabySittingService.model');
const elderlyCareServiceSchema = require('ElderlyCareService.model');
const Schema = mongoose.Schema;

const requirementSchema = new Schema({
	numberOfHoursDaily: {type: Number},
	genderPreference:	{type: String, enum: ["Male", "Female"]},
	agePreference:		{type: Number},
	interviewAddress:	{type: String},
	comments:			{type: String},
	cleaningService:	{type: cleaningServiceSchema},
	cookingService:		{type: cookingServiceSchema},
	babySittingService:	{type: babySittingServiceSchema},
	elderlyCareService:	{type: elderlyCareServiceSchema}
});

module.exports = mongoose.model('Requirement', requirementSchema);
