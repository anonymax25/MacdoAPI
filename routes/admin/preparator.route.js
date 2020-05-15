const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const AuthController = require('../../controller').AuthController;

module.exports = function (app) {
    app.post('/admin/preparator',AuthMiddleware.adminAuth(), bodyParser.json(), async (req, res) => {
        let body = req.body;
        if (body.login && body.password && body.email) {
            try {
                const admin = await AuthController.subscribe(body.login, body.password, body.email,false,true);
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
}
