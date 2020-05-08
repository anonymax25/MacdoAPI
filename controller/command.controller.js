const models = require('../models');
const Command = models.Command;
const Product = models.Product;


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
        const command = await Command.findOne({_id: id});
        const res = await Command.updateOne({_id: id}, {isValid: true});
        if(res.nModified == 0) {
            return true;
        }
        return false;
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
