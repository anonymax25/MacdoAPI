const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    token: String,
    uid: String,
    isValid: Boolean
});

module.exports = mongoose.model('Session',sessionSchema);
