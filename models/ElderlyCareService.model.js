const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elderlyCareServiceSchema = new Schema({
	age:						{type: Number},
	gender:						{type: String, enum: ["Male", "Female"]},
	isBedRidden:				{type: Boolean, default: false},
	bathingSponging: 			{type: Boolean, default: false},
	cleaningUtensilsofElderly: 	{type: Boolean, default: false},
	cookingforPatient: 			{type: Boolean, default: false},
	diaperChange: 				{type: Boolean, default: false},
	feeding: 					{type: Boolean, default: false},
	givingMedicines: 			{type: Boolean, default: false},
	injection: 					{type: Boolean, default: false},
	massage: 					{type: Boolean, default: false}
});

module.exports = elderlyCareServiceSchema;
