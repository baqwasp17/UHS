const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//const userSchema = new Schema({
//	firstName: {type:String, required: [true, "Can't be blank"]},
//	lastName: {type:String, required: [true, "Can't be blank"]},
//	email: {
//		type: String, 
//		required: [true, "Can't be blank"],
//		unique: true, 
//		lowercase: true
//	},
//	password: String,
//	permissionLevel: Number
//});

// Temp for testing
const userSchema = new Schema({
	name: {type:String, required: [true, "Can't be blank"]},
	email: {type:String, required: [true, "Can't be blank"]},
	password: {type:String, required: [true, "Can't be blank"]}
});

userSchema.pre('save', function(next) {
	const user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(userPassword) {
	return bcrypt.compareSync(userPassword, this.password);
};

module.exports  = mongoose.model('User', userSchema);
