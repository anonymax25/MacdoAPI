const models = require('../models');
const Supplement = models.Supplement;
const Accessory = models.Accessory;
const Product = models.Product;

class SupplementController {

    /**
     *
     * @param name
     * @return {Promise<Supplement>}
     */
    static async insert(name) {
        //check if accessory with this name already exists
        const supplements = await Supplement.findOne({name});
        if(supplements)
            return null;

        const supplement = new Supplement({
            name,
            count: 0
        });
        await supplement.save();
        return supplement;
    }

    static async getAll() {
        const supplements = await Supplement.find();
        return supplements;
    }

    static async getById(id) {
        const supplement = await Supplement.findOne({_id: id});
        return supplement;
    }

    static async deleteById(id) {
        const products = await Product.find({supplements: id}).exec();
        const res = products.map((product) => product = product.name);
        if(res.length > 0){
            return res;
        }

        const res2 = await Supplement.deleteOne({_id: id});
        if(res2.deletedCount != 1)
            return false;
        return true;
    }

    static async updateRealtiveCount(id, relativeDifferenceToAdd) {
        const supplement = await Supplement.findOne({_id: id});

        const res = await Supplement.updateOne({_id: id},{count: supplement.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = SupplementController;
