const models = require('../models');
const Command = models.Command;
const Product = models.Product;
const User = models.User;

class CommandController {

    static async add(customer,products,menus) {
         let price = 0;
         menus.foreach(menu => {
            price += menu.price;
         })
         products.foreach(product => {
            price += product.price;
         })

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
        const res = await Command.updateOne({_id: id}, {isValid: true});
        if(res.nModified !== 0) {
            return true;
        }
        return false;
    }

    static async isAssigned(id, staff_id) {
         const staff = await User.findOne({staff_id});

         if(staff.isPreparator) {
            const res = await Command.updateOne({_id: id}, {staff: staff_id});

            if(res.nModified !== 0) {
                return true;
            }
         }
         return false;
    }
}

module.exports = CommandController;
