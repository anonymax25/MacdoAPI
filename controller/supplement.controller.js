const models = require('../models');
const Supplement = models.Supplement;
const Accessory = models.Accessory;
const Product = models.Product;
const Menu = models.Menu;

class SupplementController {

    /**
     *
     * @param name
     * @return {Promise<null|Supplement>}
     */
    static async insert(name) {
        //check if Supplement with this name already exists
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

    /**
     *
     * @return {Promise<Supplement[]>}
     */
    static async getAll() {
        const supplements = await Supplement.find();
        return supplements;
    }

    /**
     *
     * @param id
     * @return {Promise<Supplement>}
     */
    static async getById(id) {
        const supplement = await Supplement.findOne({_id: id});
        return supplement;
    }

    /**
     *
     * @param id
     * @return {Promise<boolean|string[]>}
     */
    static async deleteById(id) {
        // check if Supplement is not used in any products before deleting it
        const products = await Product.find({supplements: id}).exec();
        const res = products.map((product) => product = product._id);
        if(res.length > 0){
            return res;
        }

        // check if Supplement is not used in any menus before deleting it
        const menus = await Menu.find({supplements: id}).exec();
        const res2 = menus.map((menu) => menu = menu._id);
        if(res2.length > 0){
            return res2;
        }

        //delete supplement if all is good
        const res3 = await Supplement.deleteOne({_id: id});
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
        const supplement = await Supplement.findOne({_id: id});

        const res = await Supplement.updateOne({_id: id},{count: supplement.count + relativeDifferenceToAdd});
        if(res.nModified != 1)
            return false;
        return true;
    }
}

module.exports = SupplementController;
