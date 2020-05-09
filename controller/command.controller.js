const models = require('../models');
const Command = models.Command;
const Product = models.Product;

const ProductController = require('./product.controller');
const IngredientController = require('./ingredients.controller');
const AccessoryController = require('./accessory.controller');
const SupplementController = require('./supplement.controller');


class CommandController {

    static async add(customer,products,menus,price) {
        const command = new Command({
            customer,
            products,
            menus,
            staff: null,
            isValid: false,
            price
        });
        await command.save();
        return command;
    }


    static async getAll() {
        const commands = await Command.find().populate('products').populate('menus');
        return commands;
    }

    static async getById(id) {
        const command = await Command.findOne({_id: id}).populate('user').populate('products').populate('menus');
        return command;
    }

    static async validate(id) {
        const command = await Command.findOne({_id: id}).populate('products').populate('menus').populate('ingredients').populate('accessories').populate('supplements');
        this.removeStockFromCommand(command);
        const res = await Command.updateOne({_id: id}, {isValid: true});
        if(res.nModified === 1) {
            return true;
        }
        return false;
    }
    static async removeStockFromCommand(command) {
        const ingredientsRemove = [];
        const accessoriesRemove = [];
        const supplementsRemove = [];

        let products = command.products;

        const menus = command.menus;
        for (const menu of menus) {
            for (const product of menu.products) {
                products.push(await ProductController.getProductById(product,false));
            }
            for (const accessory of menu.accessories) {
                accessoriesRemove.push(accessory._id);
            }
            for (const supplement of menu.supplements) {
                supplementsRemove.push(supplement._id);
            }
        }

        products.forEach(product => {
            product.ingredients.forEach(ingredient => {
                ingredientsRemove.push(ingredient._id);
            })
            product.accessories.forEach(accessory => {
                accessoriesRemove.push(accessory._id);
            })
            product.supplements.forEach(supplement => {
                supplementsRemove.push(supplement._id);
            })
        });

        ingredientsRemove.forEach(ingredient => {
            IngredientController.updateRealtiveIngredientCount(ingredient,-1);
        });
        accessoriesRemove.forEach(accessory => {
            AccessoryController.updateRealtiveCount(accessory, -1);
        });
        supplementsRemove.forEach(supplement => {
            SupplementController.updateRealtiveCount(supplement,-1);
        });
    }

    static async isAssigned(id, staff_id) {
         const command = await Command.findOne({_id: id});
         const res = await Command.updateOne({_id: id},{staff: staff_id});
         if(res.nModified == 0) {
             return true;
         }
         return false;
    }
}

module.exports = CommandController;
