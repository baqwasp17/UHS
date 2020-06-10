const mongoose 	= require('mongoose')
	, bcrypt 	= require('bcryptjs')
	, Schema 	= mongoose.Schema;

//const userSchema = new Schema({
//	name: {type:String, required: [true, "Can't be blank"]},
//	email: {
//		type: String, 
//		required: [true, "Can't be blank"],
//		unique: true, 
//		lowercase: true
//	},
//	Address: String,
//	phoneNo: String,
//	password: String,
//  resetToken: String,
//  resetTokenExpiration: Date,
//	permissionLevel: Number
//});

// Temp for testing
const userSchema = new Schema({
	name: {type:String, required: [true, "Can't be blank"]},
	email: {type:String, required: [true, "Can't be blank"]},
	password: {type:String, required: [true, "Can't be blank"]},
	resetToken: String,
	permissionLevel: {type: Number, enum: [0, 1]},
	resetTokenExpiration: Date
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

module.exports  = mongoose.model('User', userSchema);
