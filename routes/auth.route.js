const bodyParser = require('body-parser');
const AuthController = require('../controller').AuthController;

module.exports = function (app) {
    app.post('/user/subscribe', bodyParser.json(), async (req, res) => {
        let body = req.body;

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (body.login && body.login.length >= 3 && body.password && body.email && body.address && regex.test(String(body.email).toLowerCase())) {
            try {
                const user = await AuthController.subscribe(body.login, body.password, body.email, body.address,false,false);
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(409).end();
            }

        } else {
            res.status(400).end();
        }
    });

    app.post('/user/login', bodyParser.json(), async (req, res) => {
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
                res.status(400).end();
            }
        }else{
            res.status(400).end();
        }
    });

    app.delete('/user/logout/:token', bodyParser.json(), async (req, res) => {
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
                res.status(400).json(e.message);
            }
        }else{
            res.status(400).end();
        }
    });
};
