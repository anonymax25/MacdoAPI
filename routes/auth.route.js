const bodyParser = require('body-parser');
const AuthController = require('../controller').AuthController;

module.exports = function (app) {
    app.post('/subscribe', bodyParser.json(), async (req, res) => {
        let body = req.body;
        if (body.login && body.password && body.email) {
            try {
                const user = await AuthController.subscribe(body.login, body.password, body.email);
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(409).json(e);
            }

        } else {
            res.status(400).end();
        }
    });
    app.post('/login', bodyParser.json(), async (req, res) => {
        let body = req.body;
        if (body.login && body.password) {
            try {
                const session = await AuthController.login(body.login, body.password);
                if (session) {
                    res.status(201).json(session);
                } else {
                    res.status(401).end();
                }
            } catch (e) {
                res.status(400).json(e);
            }
        }else{
            res.status(400).end();
        }
    });

    app.delete('/logout/:token', bodyParser.json(), async (req, res) => {
        let token = req.params.token;
        if(token){
            try {
                const success = await AuthController.logout(token);
                if (success) {
                    res.status(204).end();
                } else {
                    res.status(401).end();
                }
            } catch (e) {
                res.status(400).json(e);
            }
        }else{
            res.status(400).end();
        }
    });
};
