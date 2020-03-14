const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requirementSchema = new Schema({

});

module.exports = mongoose.model('Requirement', requirementSchema);
