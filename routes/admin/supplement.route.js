const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const SupplementController = require('../../controller').SupplementController;

module.exports = function (app) {

    app.post('/admin/supplement', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name) {
            try {
                const ingredient = await SupplementController.insert(req.body.name);
                if (ingredient) {
                    res.status(201).json(ingredient);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e.message);
            }

        } else {
            res.status(400).end();
        }
    });

    app.get('/admin/supplement', bodyParser.json(), async (req, res) => {
        try {
            const ingredients = await SupplementController.getAll();
            if (ingredients) {
                res.status(200).json(ingredients);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    app.get('/admin/supplement/:id', bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await SupplementController.getById(req.params.id);
            if (ingredient) {
                res.status(200).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    app.delete('/admin/supplement/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id) {
            try {
                const success = await SupplementController.deleteById(req.params.id);
                if (Array.isArray(success)){
                    res.status(400).json(success);
                }
                if (success === true) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }

    });

    app.put('/admin/supplement/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.count) {
            try {
                const success = await SupplementController.updateRealtiveCount(req.params.id, req.body.count);
                if (success) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }
    });
};
