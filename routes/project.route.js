const bodyParser = require('body-parser');
const AuthMiddleware = require('../middleware').AuthMiddleware;

module.exports = function (app) {
    app.get('/isValidToken', AuthMiddleware.auth(), bodyParser.json(), (req, res) => {
        console.log(req.user);
        res.status(200).json(req.user);
    });
}
