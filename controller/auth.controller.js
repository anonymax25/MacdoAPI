const models = require('../models');
const User = models.User;
const Session = models.Session;

const SecurityUtil = require('../utils').SecuritryUtils;

class AuthController {

    /**
     *
     * @param login
     * @param password
     * @param email
     * @return {Promise<User>}
     */
    static async subscribe(login, password, email) {
        const user = new User({
            login: login,
            password: SecurityUtil.hashPassword(password),
            email: email
        });
        await user.save();
    }

     static async login(login, password) {
        const user = await User.findOne({
            login: login,
            password: SecurityUtil.hashPassword(password)
        });
        if (!user) {
            return null;
        }
        const session = new Session({
            token: await SecurityUtil.randomToken()
        });
        session.uid = user.id;
        await session.save();
        return session; // todo voir pour reformat le return avec la session
    }

    static async userFromToken(token) {
        return User.findOne({
            include: [{
                model: Session,
                where: {
                    token
                }
            }]

        });
    }
}

module.exports = AuthController;
