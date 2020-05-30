const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookingServiceSchema = new Schema({
	numberOfPeople:		{type: Number},
	veg: 		   	 	{type: Boolean},
	nonVeg: 	   	 	{type: Boolean},
	breakFast: 	   	 	{type: Boolean},
	lunch: 		   	 	{type: Boolean},
	dinner: 	   	 	{type: Boolean},
	foodPreferences: 	{type: String},
	threeBestDishes:	[{type: String}]
},{_id:false});

module.exports = cookingServiceSchema;
