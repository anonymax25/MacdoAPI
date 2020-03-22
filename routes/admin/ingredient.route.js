const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const IngredientsController = require('../../controller').IngredientsController;

module.exports = function (app) {
    app.post('/admin/ingredient', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.weight) {
            try {
                const ingredient = await IngredientsController.insertIngredient(req.body.name,req.body.weight);
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

    app.get('/admin/ingredient', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const ingredients = await IngredientsController.getIngredients();
            if (ingredients) {
                res.status(201).json(ingredients);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/admin/ingredient/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await IngredientsController.getIngredientById(req.params.id);
            if (ingredient) {
                res.status(201).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.delete('/admin/ingredient/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id) {
            try {
                const success = await IngredientsController.deleteIngredientById(req.params.id);
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

    app.put('/admin/ingredient/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.count) {
            try {
                const success = await IngredientsController.updateRealtiveIngredientCount(req.params.id, req.body.count);
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
}
