const models = require('../models');
const Ingredient = models.Ingredient;
const Supplement = models.Supplement;
const Menu = models.Menu;
const Accessory = models.Accessory;
const Product = models.Product;


class MenuController {

    /**
     *
     * @param name: string
     * @param price: number
     * @param ingredients
     * @param accessories
     * @param supplements
     * @return {Promise<Product>}
     */
    static async add(name,price,products,accessories,supplements) {
        //check if product with this name already exists
        const menus = await Menu.findOne({name});
        if(menus || price <= 0)
            return null;

        //check if products to add in menu exist
        const listProducts = await Product.find().where('_id').in(products);
        const setProductss = new Set(products);
        if(setProductss.size != listProducts.length){
            return null;
        }

        //check if accessories to add in menu exist
        const listAccessories = await Accessory.find().where('_id').in(accessories);
        const setAccessories = new Set(accessories);
        if(setAccessories.size != listAccessories.length){
            return null;
        }

        //check if accessories to add in menu exist
        const listSupplements = await Supplement.find().where('_id').in(supplements);
        const setSupplements = new Set(supplements);
        if(setSupplements.size != listSupplements.length){
            return null;
        }

        const menu = new Menu({
            name,
            price,
            products,
            accessories,
            supplements
        });
        await menu.save();
        return menu;
    }

    static async getAll(doPopulate) {
        let menus = null;
        if(doPopulate) {
            menus = await Menu.find().populate('products').populate('accessories').populate('supplements');
        } else {
            menus = await Menu.find();
        }
        return menus;
    }

    static async getById(id) {
        const menu = await Menu.findOne({_id: id}).populate('ingredients').populate('accessories').populate('supplements');
        return menu;
    }

    static async deleteById(id) {
        const res = await Menu.deleteOne({_id: id});
        if(res.deletedCount != 1)
            return false;
        return true;
    }

    /*
    static async addIngredientToProductById(id,ingredientId) {

        const product = await Product.findOne({_id: id});
        if(!product){
            return false;
        }
        console.log(product);
        console.log(ingredientId);
        const idx = product.ingredients.indexOf(ingredientId);
        if(idx == -1){
            return false;
        }
        console.log(idx);

        product.ingredients.splice(idx,1);

        console.log(product);

        product.save((error) => {
            if (error){
                return false;
            }
        });
        return true;
    }

    static async removeIngredientFromProductById(id,ingredientId) {
        const product = await Product.findOne({_id: id});
        if(!product){
            return false;
        }
        console.log(product);
        console.log(ingredientId);
        const idx = product.ingredients.indexOf(ingredientId);
        if(idx == -1){
            return false;
        }
        console.log(idx);

        product.ingredients.splice(idx,1);

        console.log(product);

        product.save((error) => {
            if (error){
                return false;
            }
        });
        return true;
    }
    */
    /*
    static async updateRealtiveIngredientCount(id, relativeDifferenceToAdd) {
        const ingredient = await Ingredient.findOne({_id: id});

        const res = await Ingredient.updateOne({_id: id},{count: ingredient.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
    */
}

module.exports = MenuController;
