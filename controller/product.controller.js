const models = require('../models');
const Ingredient = models.Ingredient;
const Supplement = models.Supplement;
const Accessory = models.Accessory;
const Product = models.Product;


class ProductsController {

    /**
     *
     * @param name
     * @param price
     * @param ingredients
     * @param accessories
     * @param supplements
     * @return {Promise<null|Product>}
     */
    static async insertProduct(name,price,ingredients,accessories,supplements) {
        //check if product with this name already exists
        const products = await Product.findOne({name});
        if(products || price <= 0)
            return null;

        //check if ingredients to add in product exist
        const listIngrendients = await Ingredient.find().where('_id').in(ingredients);
        const setIngredients = new Set(ingredients);
        if(setIngredients.size != listIngrendients.length){
            return null;
        }

        //check if accessories to add in product exist
        const listAccessories = await Accessory.find().where('_id').in(accessories);
        const setAccessories = new Set(accessories);
        if(setAccessories.size != listAccessories.length){
            return null;
        }

        //check if accessories to add in product exist
        const listSupplements = await Supplement.find().where('_id').in(supplements);
        const setSupplements = new Set(supplements);
        if(setSupplements.size != listSupplements.length){
            return null;
        }

        const product = new Product({
            name,
            price,
            ingredients,
            accessories,
            supplements
        });
        await product.save();
        return product;
    }

    /**
     *
     * @param doPopulate
     * @return {Promise<Product[]>}
     */
    static async getProducts(doPopulate) {
        let products = null;
        if(doPopulate){
            products = await Product.find().populate('ingredients').populate('accessories').populate('supplements');
        } else {
            products = await Product.find();
        }
        return products;
    }

    /**
     *
     * @param id
     * @return {Promise<Product>}
     */
    static async getProductById(id) {
        const product = await Product.findOne({_id: id}).populate('ingredients').populate('accessories').populate('supplements');
        return product;
    }

    /**
     *
     * @param id
     * @return {Promise<boolean>}
     */
    static async deleteProductById(id) {
        const res = await Product.deleteOne({_id: id});
        if(res.deletedCount != 1)
            return false;
        return true;
    }

    /**
     *
     * @param id
     * @param ingredientId
     * @return {Promise<boolean>}
     */
    static async addIngredientToProductById(id,ingredientId) {

        const product = await Product.findOne({_id: id});
        if(!product){
            return false;
        }
        const idx = product.ingredients.indexOf(ingredientId);
        if(idx == -1){
            return false;
        }

        product.ingredients.splice(idx,1);

        product.save((error) => {
            if (error){
                return false;
            }
        });
        return true;
    }

    /**
     *
     * @param id
     * @param ingredientId
     * @return {Promise<boolean>}
     */
    static async removeIngredientFromProductById(id,ingredientId) {
        const product = await Product.findOne({_id: id});
        if(!product){
            return false;
        }
        const idx = product.ingredients.indexOf(ingredientId);
        if(idx == -1){
            return false;
        }

        product.ingredients.splice(idx,1);

        product.save((error) => {
            if (error){
                return false;
            }
        });
        return true;
    }
}

module.exports = ProductsController;
