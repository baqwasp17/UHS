const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {type:String, required: [true, "Can't be blank"]},
	lastName: {type:String, required: [true, "Can't be blank"]},
	email: {type: String, unique: true, lowercase: true},
	password: String,
	permissionLevel: Number
});

module.exports  = mongoose.model('User', userSchema);
