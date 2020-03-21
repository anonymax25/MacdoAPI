const AuthMiddleware = require('../middleware').AuthMiddleware;

module.exports = function (app) {
    app.get('/project', AuthMiddleware.auth(), (req, res) => {
        console.log(req.user);
        res.status(204).end();
    });
}
