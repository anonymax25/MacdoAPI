const bodyParser = require('body-parser');

const CommandController = require('../controller').CommandController;

module.exports = function (app) {
    app.post('/command', bodyParser.json(), async (req, res) => {
        try {
            const command = await CommandController.add(req.body.customer, req.body.products, req.body.menus, req.body.staff, req.body.price);
            if (command) {
                res.status(201).json(command);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/command', bodyParser.json(), async (req, res) => {
        try {
            const products = await CommandController.getAll();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/command/:id', bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await CommandController.getById(req.params.id);
            if (ingredient) {
                res.status(200).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });
}
