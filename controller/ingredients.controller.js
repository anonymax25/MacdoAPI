const models = require('../models');
const Ingredient = models.Ingredient;
const Accessory = models.Accessory;

const SecurityUtil = require('../utils').SecuritryUtils;

class IngredientsController {

    /**
     *
     * @param name
     * @param weight
     * @return {Promise<Ingredient>}
     */
    static async insertIngredient(name,weight) {
        //check if ingredient with this name already exists
        const ingredients = await Ingredient.findOne({name});
        if(ingredients)
            return null;

        const ingredient = new Ingredient({
            name,
            weight,
            count: 0
        });
        await ingredient.save();
        return ingredient;
    }

    static async getIngredients() {
        const ingredients = await Ingredient.find();
        return ingredients;
    }

    static async getIngredientById(id) {
        const ingredient = await Ingredient.findOne({_id: id});
        return ingredient;
    }

    static async deleteIngredientById(id) {
        const res = await Ingredient.deleteOne({_id: id});
        if(res.deletedCount != 1)
            return false;
        return true;
    }

    static async updateRealtiveIngredientCount(id, relativeDifferenceToAdd) {
        const ingredient = await Ingredient.findOne({_id: id});

        const res = await Ingredient.updateOne({_id: id},{count: ingredient.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = IngredientsController;
