const models = require('../models');
const Command = models.Command;
const Product = models.Product;


class CommandController {

    static async add(customer,products,menus,staff,price) {
        const command = new Command({
            customer,
            products,
            menus,
            staff,
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
}

module.exports = CommandController;
