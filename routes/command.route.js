const bodyParser = require('body-parser');

const CommandController = require('../controller').CommandController;
const AuthMiddleware = require('../middleware').AuthMiddleware;

module.exports = function (app) {
    app.post('/command', bodyParser.json(), async (req, res) => {
        try {
            const command = await CommandController.add(req.body.customer, req.body.products, req.body.menus, req.body.price);
            if (command) {
                res.status(201).json(command);
            } else {
                res.status(400).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/command', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const products = await CommandController.getAll();
            if (products) {
                res.status(200).json(products);
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/command/:id', bodyParser.json(), async (req, res) => {
        try {
            const command = await CommandController.getById(req.params.id);
            if (ingredient) {
                res.status(200).json(command);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.put('/command/valid/:id', bodyParser.json(), async (req, res) => {
           try {
               const command = await CommandController.validate(req.params.id);
               if (command) {
                   res.status(200).json(command);
               } else {
                   res.status(409).end();
               }
           } catch (e) {
               res.status(500).json(e);
               console.log(e);
           }
    });

    app.put('/command/staff/:id', bodyParser.json(), async (req, res) => {
           try {
               const command = await CommandController.isAssigned(req.params.id, req.body.staff);
               console.log(command);
               if (command) {
                   res.status(200).json(command);
               } else {
                   res.status(409).end();
               }
           } catch (e) {
               res.status(500).json(e);
           }
    });
}
