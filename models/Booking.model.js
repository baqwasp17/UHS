const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: Schema.Types.ObjectId,
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	housekeeperId: {type: Schema.Types.ObjectId, ref: 'Housekeeper'},
	ammount: {type: Number}
});

module.exports = mongoose.schema('Booking', bookingSchema);
