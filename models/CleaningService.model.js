const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cleaningServiceSchema = new Schema({
	houseSize:						{type: Number},
	numberOfPeople:					{type: Number},
	bathroomCleaning: 				{type: Boolean},
	clothesIroning: 				{type: Boolean},
	clothesWashingHand: 			{type: Boolean},
	clothesWashingMachine: 			{type: Boolean},
	dusting: 						{type: Boolean},
	floorCleaning: 					{type: Boolean},
	groceryShopping: 				{type: Boolean},
	utensilCleaning: 				{type: Boolean},
},{_id:false});

module.exports = cleaningServiceSchema;
