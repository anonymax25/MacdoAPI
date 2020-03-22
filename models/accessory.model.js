const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
    name: String,
    count: Number
});

module.exports = mongoose.model('Accessory',accessorySchema);

