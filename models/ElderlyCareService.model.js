const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elderlyCareServiceSchema = new Schema({
	elderAge:					{type: Number},
	elderGender:				{type: String, enum: ["Male", "Female"]},
	isBedRidden:				{type: Boolean},
	bathingSponging: 			{type: Boolean},
	cleaningUtensilsOfElderly: 	{type: Boolean},
	cookingForPatient: 			{type: Boolean},
	diaperChange: 				{type: Boolean},
	feeding: 					{type: Boolean},
	givingMedicines: 			{type: Boolean},
	injection: 					{type: Boolean},
	massage: 					{type: Boolean},
	takingElderlyForAWalk:		{type: Boolean}
},{_id:false});

module.exports = elderlyCareServiceSchema;
