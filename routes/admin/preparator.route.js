const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const AuthController = require('../../controller').AuthController;

module.exports = function (app) {

    app.get('/admin/preparator',AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
            try {
                const preparators = await AuthController.getAllUsers(true, false);
                if (preparators) {
                    res.status(200).json(preparators);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }
    });

    app.post('/admin/preparator',AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        if (req.body.login && req.body.password && req.body.email) {
            try {
                const admin = await AuthController.subscribe(req.body.login, req.body.password, req.body.email, false, true);
                if (admin) {
                    res.status(201).json(admin);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }

        } else {
            res.status(400).end();
        }
    });

    app.delete('/admin/preparator/:id', AuthMiddleware.adminAuth(), async (req, res) => {
        if (req.params.id) {
            try {
                const admin = await AuthController.deleteUser(req.params.id);
                if (admin) {
                    res.status(204).json();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                console.log(e);
                res.status(500).end();
            }

        } else {
            res.status(400).end();
        }
    });
}
