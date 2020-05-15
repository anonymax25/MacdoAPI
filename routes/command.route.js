const bodyParser = require('body-parser');
const CommandController = require('../controller').CommandController;
const AuthMiddleware = require('../middleware').AuthMiddleware;

module.exports = function (app) {
    app.post('/command', bodyParser.json(), async (req, res) => {
        if(req.body.products || req.body.menus) {
            try {
                const command = await CommandController.add(req.body.customer, req.body.products, req.body.menus);
                if (command) {
                    res.status(201).json(command);
                }else{
                    res.status(401).end();
                }
            } catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
        } else {
            res.status(400).end();
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

    app.get('/command/noStaff', AuthMiddleware.staffAuth(),  bodyParser.json(), async (req, res) => {
        try {
            const products = await CommandController.getAllNoStaff();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/command/history/:id', AuthMiddleware.auth(), async (req, res) => {
        if(req.params.id) {
            try {
                const commands = await CommandController.getHistory(req.params.id);
                if (commands) {
                    res.status(200).json(commands);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e);
            }
        }else{
            res.status(400).end();
        }
    });

    app.get('/command/:id', AuthMiddleware.auth(), bodyParser.json(), async (req, res) => {
        try {
            const command = await CommandController.getById(req.params.id);
            if (command) {
                res.status(200).json(command);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.put('/command/valid/:id', AuthMiddleware.staffAuth(), bodyParser.json(), async (req, res) => {

       try {
           const command = await CommandController.validateCommand(req.params.id);
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

    app.put('/command/staff/:id', AuthMiddleware.staffAuth(), async (req, res) => {
        if(req.user._id) {
            try {
                const command = await CommandController.assignPreparator(req.params.id, req.user._id);
                if (command) {
                    res.status(200).json(command);
                }
            } catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
        } else {
            res.status(400).end();
        }
    });
}
