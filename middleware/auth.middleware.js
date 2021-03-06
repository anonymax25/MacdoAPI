const AuthController = require('../controller').AuthController;

class AuthMiddleware {

    /**
     * @description Middleware to check if Bearer token is valid and corresponds to normal user
     * @return {function(...[*]=)}
     */
    static auth() {
        return async function(req, res, next){
            const authorization = req.headers['authorization'];
            if(!authorization || !authorization.startsWith('Bearer ')){
                res.status(401).end();
                return;
            }
            const token = authorization.slice(7);
            const user = await AuthController.userFromToken(token);
            if(!user) {
                res.status(403).end();
                return;
            }
            //normal user, not admin or staff
            if(user.isStaff || user.isAdmin) {
                res.status(403).end();
                return;
            }
            req.user = user;
            next();
        }
    }
    
    static staffAuth() {
        return async function(req, res, next){
            const authorization = req.headers['authorization'];
            if(!authorization || !authorization.startsWith('Bearer ')){
                res.status(401).end();
                return;
            }
            const token = authorization.slice(7);
            const staff = await AuthController.userFromToken(token);
            if(!staff){
                res.status(403).end();
                return;
            }

            if(!staff.isStaff || staff.isAdmin) {
                res.status(403).end();
                return;
            }
            req.user = staff;
            next();
        }
    }
  
    /**
     * @description Middleware to check if Bearer token is valid and corresponds to an admin user
     * @return {function(...[*]=)}
     */
    static adminAuth() {
        return async function(req, res, next){
            const authorization = req.headers['authorization'];
            if(!authorization || !authorization.startsWith('Bearer ')) {
                res.status(401).end();
                return;
            }
            const token = authorization.slice(7);
            const admin = await AuthController.adminFromToken(token);
            if(!admin) {
                res.status(403).end();
                return;
            }
            req.user = admin;
            next();
        }
    }

    static allAuth() {
        return async function(req, res, next){
            const authorization = req.headers['authorization'];
            if(!authorization || !authorization.startsWith('Bearer ')){
                res.status(401).end();
                return;
            }
            const token = authorization.slice(7);
            const user = await AuthController.userFromToken(token);
            if(!user) {
                res.status(403).end();
                return;
            }
            req.user = user;
            next();
        }
    }
}
module.exports = AuthMiddleware;
