const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: Schema.Types.ObjectId,
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	housekeeperId: {type: Schema.Types.ObjectId, ref: 'Housekeeper'},
	reqirementId: {type: Schema.Types.ObjectId, ref: 'Requirement'},
	ammount: {type: Number}
});

module.exports = mongoose.model('Booking', bookingSchema);
