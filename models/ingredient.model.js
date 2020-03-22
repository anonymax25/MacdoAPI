const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: String,
    weight: Number,
    count: Number
});

module.exports = mongoose.model('Ingredient',ingredientSchema);

