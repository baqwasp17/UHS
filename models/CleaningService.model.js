const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cleaningServiceSchema = new Schema({
	houseSize:						{type: Number},
	bathroomCleaning: 				{type: Boolean, default: false},
	clothesIroning: 				{type: Boolean, default: false},
	clothesWashingHand: 			{type: Boolean, default: false},
	clothesWashingWashingMachine: 	{type: Boolean, default: false},
	dusting: 						{type: Boolean, default: false},
	floorCleaning: 					{type: Boolean, default: false},
	groceryShopping: 				{type: Boolean, default: false},
	utensilCleaning: 				{type: Boolean, default: false}
});

module.exports = cleaningServiceSchema;
