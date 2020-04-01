const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplementSchema = new Schema({
    name: String,
    count: Number
});

module.exports = mongoose.model('Supplement',supplementSchema);

