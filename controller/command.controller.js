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
        const menu = await Menu.findOne({_id: id}).populate('ingredients').populate('accessories').populate('supplements');
        return menu;
    }
}

module.exports = CommandController;
