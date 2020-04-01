const models = require('../models');
const Ingredient = models.Ingredient;
const Accessory = models.Accessory;
const Product = models.Product;

class AccessoryController {

    /**
     *
     * @param name
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

    static async getAll() {
        const accessories = await Accessory.find();
        return accessories;
    }

    static async getById(id) {
        const accessory = await Accessory.findOne({_id: id});
        return accessory;
    }

    static async deleteById(id) {
        const products = await Product.find({accessories: id}).exec();
        const res = products.map((product) => product = product.name);
        if(res.length > 0){
            return res;
        }

        const res2 = await Accessory.deleteOne({_id: id});
        if(res2.deletedCount != 1)
            return false;
        return true;
    }

    static async updateRealtiveCount(id, relativeDifferenceToAdd) {
        const accessory = await Accessory.findOne({_id: id});

        const res = await Accessory.updateOne({_id: id},{count: accessory.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = AccessoryController;
