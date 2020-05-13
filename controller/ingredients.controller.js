const models = require('../models');
const Ingredient = models.Ingredient;
const Accessory = models.Accessory;
const Product = models.Product;

class IngredientsController {

    /**
     *
     * @param name
     * @param weight
     * @return {Promise<null|Ingredient>}
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

    /**
     *
     * @return {Promise<Ingredient[]>}
     */
    static async getIngredients() {
        const ingredients = await Ingredient.find();
        return ingredients;
    }

    /**
     *
     * @param id
     * @return {Promise<Ingredient>}
     */
    static async getIngredientById(id) {
        const ingredient = await Ingredient.findOne({_id: id});
        return ingredient;
    }

    /**
     *
     * @param id
     * @return {Promise<boolean|string[]>}
     */
    static async deleteIngredientById(id) {
        const products = await Product.find({ingredients: id}).exec();
        const res = products.map((product) => product = product._id);
        if (res.length > 0){
            return res;
        }
        const res2 = await Ingredient.deleteOne({_id: id});
        if(res2.deletedCount != 1)
            return false;
        return true;
    }

    /**
     *
     * @param id
     * @param relativeDifferenceToAdd
     * @return {Promise<boolean>}
     */
    static async updateRealtiveIngredientCount(id, relativeDifferenceToAdd) {
        const ingredient = await Ingredient.findOne({_id: id});

        const res = await Ingredient.updateOne({_id: id},{count: ingredient.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = IngredientsController;
