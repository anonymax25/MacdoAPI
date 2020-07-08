const bodyParser = require('body-parser');
const CommandController = require('../controller').CommandController;
const AuthMiddleware = require('../middleware').AuthMiddleware;

module.exports = function (app) {

    /**
     * @description faire une command
     */
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
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }
    });

    /**
     * @description get toutes les commandes
     */
    app.get('/command', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const products = await CommandController.getAll();
            if (products) {
                res.status(200).json(products);
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    /**
     * @description get les commandes qui n'ont pas de staff attribué
     */
    app.get('/command/noStaff', AuthMiddleware.staffAuth(),  bodyParser.json(), async (req, res) => {
        try {
            const products = await CommandController.getAllNoStaff();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    /**
     * @description get les commandes d'un utilisateur
     */
    app.get('/command/history', AuthMiddleware.auth(), async (req, res) => {
        if(req.user._id) {
            try {
                const commands = await CommandController.getHistory(req.user._id);
                if (commands) {
                    res.status(200).json(commands);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e.message);
            }
        }else{
            res.status(400).end();
        }
    });

    /**st
     * @description get les commandes pas validé d'un staff
     */
    app.get('/command/staff/notvalid', AuthMiddleware.staffAuth(), async (req, res) => {
        if(req.user._id) {
            try {
                const commands = await CommandController.getCommandNotValidatedOfStaff(req.user._id);
                if (commands) {
                    res.status(200).json(commands);
                }
            } catch (e) {
                console.log(e);
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }
    });

    /**
     * @description get les commandes validé d'un staff
     */
    app.get('/command/staff/valid', AuthMiddleware.staffAuth(), async (req, res) => {
        if(req.user._id) {
            try {
                const commands = await CommandController.getCommandValidatedOfStaff(req.user._id);
                if (commands) {
                    res.status(200).json(commands);
                }
            } catch (e) {
                console.log(e);
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }
    });

    /**
     * @description get une command par id pour un user
     */
    app.get('/command/:id', AuthMiddleware.auth(), async (req, res) => {
        try {
            const command = await CommandController.getById(req.params.id);
            if (command) {
                res.status(200).json(command);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    /**
     * @description a staff validates the command setting it as delivered to the client
     */
    app.put('/command/valid/:id', AuthMiddleware.staffAuth(), async (req, res) => {
       try {
           if (CommandController.isStaffOfCommand(req.params.id,req.user._id)) {
               const success = await CommandController.validateCommand(req.params.id);
               if (success) {
                   res.status(200).json();
               } else {
                   res.status(409).end();
               }
           }else{
               res.status(401).end();
           }
       } catch (e) {
           res.status(500).json(e.message);
           console.log(e);
       }
    });

    /**
     * @description un staff s'assigne à une commande
     */
    app.put('/command/staff/:id', AuthMiddleware.staffAuth(), async (req, res) => {
        if(req.user._id) {
            try {
                const command = await CommandController.assignPreparator(req.params.id, req.user._id);
                if (command) {
                    res.status(200).json(command);
                }
            } catch (e) {
                console.log(e);
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }
    });


}
