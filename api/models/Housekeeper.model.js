const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
	
});

const verificationSchema = new Schema({
	verified: {type: Boolean, default: false},
	documents: {
		type:String, 
		enum: 
			['Aadhar', 'Voter\'s ID Card', 'PAN Card', ''],
		default: ''
	}
});

const housekeeperSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: {type: String, required: [true, "Can't be Blank"]},
	lastName: {type: String, required: [true, "Can't be Blank"]},
	gender: {type: String, required: [true, "Can't be Blank"], enum: ["Male", "Female"]},
	verificationStatus: verificationSchema,
	services: [serviceSchema],
	experience: {
		type: Object,
		years: {type: Number, default: 0},
		description: {type: String, default: ''},
	},
	picture: {type: String, default: ''},
	minSalary: {type: Number, default: 4000}
});

module.exports = mongoose.model('Housekeeper', housekeeperSchema);
