const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const babySittingServiceSchema = new Schema({
	age:						{type: Number, required: [true, "Age is required"]},
	gender:						{type: String, enum: ["Male", "Female"]},
	babyBathing: 				{type: Boolean, default: false},
	babyMassage: 				{type: Boolean, default: false},
	changingDiaper: 			{type: Boolean, default: false},
	cleaningUtensilsofBaby: 	{type: Boolean, default: false},
	feeding: 					{type: Boolean, default: false},
	motherMassage: 				{type: Boolean, default: false},
	preparingBabyFood: 			{type: Boolean, default: false},
	preparingBabyforSleep: 		{type: Boolean, default: false},
	takingBabyforaWalk: 		{type: Boolean, default: false},
	washingBabyClothes: 		{type: Boolean, default: false},
	otherBabySittingServices: 	{type: Boolean, default: false}
});

module.exports = babySittingServiceSchema;
