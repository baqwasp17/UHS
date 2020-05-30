const mongoose = require('mongoose');
const cleaningServiceSchema = require('./CleaningService.model.js');
const cookingServiceSchema = require('./CookingService.model.js');
const babySittingServiceSchema = require('./BabySittingService.model.js');
const elderlyCareServiceSchema = require('./ElderlyCareService.model.js');
const Schema = mongoose.Schema;

const requirementSchema = new Schema({
	userId:				{type: Schema.Types.ObjectId, ref:'User'},
	requirementType:	{type: Number},
	numberOfHoursDaily: {type: Number},
	religionPrefrence:	{type: String},
	approxSalary:		{type: Number},
	genderPreference:	{type: String, enum: ["Any", "Male", "Female"], default: "Any"},
	agePreference:		{type: Number},
	interviewAddress:	{type: String},
	comments:			{type: String},
	cleaningService:	{type: cleaningServiceSchema},
	cookingService:		{type: cookingServiceSchema},
	babySittingService:	{type: babySittingServiceSchema},
	elderlyCareService:	{type: elderlyCareServiceSchema},
	dateAdded:			{type: Date, default: Date.now}
});

module.exports = mongoose.model('Requirement', requirementSchema);
