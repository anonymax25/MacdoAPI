const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const AccessoryController = require('../../controller').AccessoryController;

module.exports = function (app) {
    app.post('/admin/accessory', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name) {
            try {
                const ingredient = await AccessoryController.insert(req.body.name);
                if (ingredient) {
                    res.status(201).json(ingredient);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e);
            }

        } else {
            res.status(400).end();
        }
    });

    app.get('/admin/accessory', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const ingredients = await AccessoryController.getAll();
            if (ingredients) {
                res.status(201).json(ingredients);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/admin/accessory/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await AccessoryController.getById(req.params.id);
            if (ingredient) {
                res.status(201).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.delete('/admin/accessory/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id) {
            try {
                const success = await AccessoryController.deleteById(req.params.id);
                if (success) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e);
            }
        } else {
            res.status(400).end();
        }

    });

    app.put('/admin/accessory/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.count) {
            try {
                const success = await AccessoryController.updateRealtiveCount(req.params.id, req.body.count);
                if (success) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e.toString());
            }
        } else {
            res.status(400).end();
        }
    });
}
