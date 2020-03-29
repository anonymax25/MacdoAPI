const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const ProductsController = require('../../controller').ProductsController;

module.exports = function (app) {
    app.post('/admin/product', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.price && req.body.ingredients && req.body.accessories) {
            try {
                const ingredient = await ProductsController.insertProduct(req.body.name, req.body.price, req.body.ingredients, req.body.accessories, null);
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

    app.get('/admin/product', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const products = await ProductsController.getProducts();
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.get('/admin/product/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        try {
            const ingredient = await ProductsController.getProductById(req.params.id);
            if (ingredient) {
                res.status(201).json(ingredient);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });

    app.delete('/admin/product/:id', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.params.id) {
            try {
                const success = await ProductsController.deleteProductById(req.params.id);
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
