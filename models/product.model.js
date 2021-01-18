const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: 'Accessory'
    }],
    supplements: [{
        type: Schema.Types.ObjectId,
        ref: 'Supplement'
    }],
    promoPourcentage: Number
});

module.exports = mongoose.model('Product',productSchema);
