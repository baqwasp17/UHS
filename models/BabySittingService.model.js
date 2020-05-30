const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const babySittingServiceSchema = new Schema({
	babyAge:					{type: Number, required: [true, "Age is required"]},
	babyGender:					{type: String, enum: ["Male", "Female"]},
	babyBathing: 				{type: Boolean},
	babyMassage: 				{type: Boolean},
	changingDiaper: 			{type: Boolean},
	cleaningUtensilsOfBaby: 	{type: Boolean},
	feeding: 					{type: Boolean},
	motherMassage: 				{type: Boolean},
	preparingBabyFood: 			{type: Boolean},
	preparingBabyForSleep: 		{type: Boolean},
	takingBabyForAWalk: 		{type: Boolean},
	washingBabyClothes: 		{type: Boolean},
},{_id:false});

module.exports = babySittingServiceSchema;
