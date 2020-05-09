const bodyParser = require('body-parser');
const AuthMiddleware = require('../../middleware').AuthMiddleware;

const AuthController = require('../../controller').AuthController;

module.exports = function (app) {
    app.post('/admin/subscribe', bodyParser.json(), async (req, res) => {
        let body = req.body;
        if (body.login && body.password && body.email && body.adminPassword) {
            if(body.adminPassword != process.env.ADMIN_KEY){
                console.log("bad admin key: " + body.adminPassword);
                res.status(400).end();
                return;
            }
            try {
                const admin = await AuthController.subscribe(body.login, body.password, body.email,true,false);
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

