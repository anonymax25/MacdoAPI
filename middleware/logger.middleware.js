const AuthController = require('../controller').AuthController;

class LoggerMiddleware {

    static httpLogger() {
        return async function(req, res, next){
            console.log(`${req.method} : ${req.url}`)
            next();
        }
    }
}
module.exports = LoggerMiddleware;
