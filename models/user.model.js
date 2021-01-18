const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    password: String,
    email: String,
    address: String,
    isAdmin: Boolean,
    isStaff: Boolean
});

module.exports = mongoose.model('User',userSchema);

