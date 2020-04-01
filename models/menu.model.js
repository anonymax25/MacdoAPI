const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    price: Number,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: 'Accessory'
    }],
    supplements: [{
        type: Schema.Types.ObjectId,
        ref: 'Supplement'
    }],
});

module.exports = mongoose.model('Menu',menuSchema);
