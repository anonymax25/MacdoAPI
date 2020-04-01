const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const MenuController = require('../../controller').MenuController;

module.exports = function (app) {

    app.post('/admin/menu', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.price && req.body.products && req.body.accessories && req.body.supplements) {
            try {
                const ingredient = await MenuController.add(req.body.name, req.body.price, req.body.products, req.body.accessories, req.body.supplements);
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

    app.get('/admin/menu', bodyParser.json(), async (req, res) => {
        try {
            const products = await MenuController.getAll();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/admin/menu/:id', bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await MenuController.getById(req.params.id);
            if (ingredient) {
                res.status(201).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.delete('/admin/menu/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id) {
            try {
                const success = await MenuController.deleteById(req.params.id);
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

    /*
    app.put('/admin/product/removeingredient/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.id) {
            try {
                const success = await ProductsController.removeIngredientFromProductById(req.params.id, req.body.id);
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

    app.put('/admin/product/addingredient/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.id) {
            try {
                const success = await ProductsController.addIngredientToProductById(req.params.id, req.body.id);
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
    */
    /*
    app.put('/admin/product/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id && req.body.count) {
            try {
                const success = await ProductsController.updateRealtiveIngredientCount(req.params.id, req.body.count);
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

     */
}
