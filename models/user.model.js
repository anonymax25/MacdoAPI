const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    password: String,
    email: String,
    isAdmin: Boolean,
    isPeparator: Boolean
});

module.exports = mongoose.model('User',userSchema);

