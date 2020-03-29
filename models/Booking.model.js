const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: mongoose.Types.Object
});

module.exports = mongoose.schema('Booking', bookingSchema);
