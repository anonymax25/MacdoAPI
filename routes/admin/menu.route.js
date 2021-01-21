const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const MenuController = require('../../controller').MenuController;

module.exports = function (app) {

    app.post('/admin/menu', AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.price && req.body.products && req.body.accessories && req.body.supplements) {
            try {
                const menu = await MenuController.add(req.body.name, req.body.price, req.body.products, req.body.accessories, req.body.supplements);
                if (menu) {
                    res.status(201).json(menu);
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

    app.get('/admin/menu', bodyParser.json(), async (req, res) => {

        try {
            const menus = await MenuController.getAll(true);
            if (menus) {
                res.status(200).json(menus);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    });

    app.get('/admin/menu/:id', bodyParser.json(), async (req, res) => {
        try {
            const menu = await MenuController.getById(req.params.id);
            if (menu) {
                res.status(200).json(menu);
            } else {
                res.status(409).end();
            }
        } catch (e) {
            res.status(500).json(e.message);
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
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).end();
        }

    });
}
