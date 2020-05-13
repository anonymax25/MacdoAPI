const models = require('../models');
const Command = models.Command;
const UserController = require('./controller').AuthController;
const MenuController = require('./controller').MenuController;
const ProductsController = require('./controller').ProductsController;

class CommandController {

    static async add(customer,products,menus) {
         let price = 0;
         let res;

         menus.foreach(menu_id => {
            res = MenuController.getById({menu_id});
            price += res.price;
         });

         products.foreach(product_id => {
            res = ProductsController.getProductById({product_id})
            price += res.price;
         });

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
        const commands = await Command.find().populate('user').populate('products').populate('menus');
        return commands;
    }

    static async getById(id) {
        const command = await Command.findOne({_id: id}).populate('user').populate('products').populate('menus');
        return command;
    }

    static async validate(id) {
            const res = await Command.updateOne({_id: id}, {isValid: true});
            if(res.nModified !== 0) {
                return true;
            }
            return false;
    }

    static async isAssigned(id, staff_id) {
         const staff = await UserController.getUserById({staff_id});

         if(staff.isPreparator) {
            const res = await Command.updateOne({_id: id}, {staff: staff_id});

            if(res.nModified === 1) {
                return true;
            }
         }
         return false;
    }
}

module.exports = CommandController;
