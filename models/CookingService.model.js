const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookingServiceSchema = new Schema({
	numberOfPeople:	{type: Number},
	veg: 			{type: Boolean, default: false},
	nonVeg: 		{type: Boolean, default: false},
	breakFast: 		{type: Boolean, default: false},
	lunch: 			{type: Boolean, default: false},
	dinner: 		{type: Boolean, default: false}
});

module.exports = cookingServiceSchema;
