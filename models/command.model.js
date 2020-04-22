const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isValid: Boolean,
    price: Number
});

module.exports = mongoose.model('Command',commandSchema);