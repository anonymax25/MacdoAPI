const models = require('../models');
const Ingredient = models.Ingredient;
const Accessory = models.Accessory;
const Product = models.Product;
const Menu = models.Menu;

class AccessoryController {

    /**
     *
     * @param name {string}
     * @return {Promise<Ingredient>}
     */
    static async insert(name) {
        //check if accessory with this name already exists
        const accessories = await Accessory.findOne({name});
        if(accessories)
            return null;

        const accessory = new Accessory({
            name,
            count: 0
        });
        await accessory.save();
        return accessory;
    }

    /**
     *
     * @return {Promise<Accessory[]>}
     */
    static async getAll() {
        const accessories = await Accessory.find();
        return accessories;
    }

    /**
     *
     * @param id
     * @return {Promise<Accessory>}
     */
    static async getById(id) {
        const accessory = await Accessory.findOne({_id: id});
        return accessory;
    }

    /**
     *
     * @param id
     * @return {Promise<boolean|string[]>}
     */
    static async deleteById(id) {

        // check if accessory is not used in any product
        const products = await Product.find({accessories: id}).exec();
        const res = products.map((product) => product = product._id);
        if(res.length > 0){
            return res;
        }


        // check if accessory is not used in any menus
        const menus = await Menu.find({accessories: id}).exec();
        const res2 = menus.map((menu) => menu = menu._id);
        if(res2.length > 0){
            return res2;
        }

        const res3 = await Accessory.deleteOne({_id: id});
        if(res3.deletedCount != 1)
            return false;
        return true;
    }

    /**
     *
     * @param id
     * @param relativeDifferenceToAdd
     * @return {Promise<boolean>}
     */
    static async updateRealtiveCount(id, relativeDifferenceToAdd) {
        const accessory = await Accessory.findOne({_id: id});

        const res = await Accessory.updateOne({_id: id},{count: accessory.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = AccessoryController;
