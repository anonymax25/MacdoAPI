

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
     * @param isAdmin
     * @param isStaff
     * @return {Promise<null|User>}
     */
    static async subscribe(login, password, email, address, isAdmin, isStaff) {
        //check if user with this email already exists
        const emails = await User.findOne({email});
        if(emails)
            return null;

        //check if user with this login already exists
        const logins = await User.findOne({login});
        if(logins)
            return null;

        const user = new User({
            login,
            password: SecurityUtil.hashPassword(password),
            email,
            address,
            isAdmin,
            isStaff
        });
        await user.save();
        return user;
    }

    /**
     *
     * @param login
     * @param password
     * @return {Promise<null|Session>}
     */
    static async login(login, password) {
        const user = await User.findOne({
            login: login,
            password: SecurityUtil.hashPassword(password)
        });
        if (!user) {
            return null;
        }
        const session = new Session({
            token: await SecurityUtil.randomToken(),
            isValid: true
        });
        session.uid = user.id;
        await session.save();
        return session;
    }

    static async getUserById(id) {
        const user = await User.findOne({_id: id});
        return user;
    }
  
    /**
     *
     * @param token
     * @return {Promise<null|User>}
     */
    static async userFromToken(token) {
        const session = await Session.findOne({token: token, isValid: true});
        if(!session){
            return null;
        }
        const user = await User.findOne({_id: session.uid});
        return user;
    }

    static async getAllUsers(isStaff, isAdmin){
        return  await User.find({isStaff, isAdmin});
    }

    static async deleteUser(id){
        const res = await User.deleteOne({_id: id});
        if(res.deletedCount === 1){
            return true;
        }
        return false;
    }
    /**
     *
     * @param token
     * @return {Promise<null|User>}
     */
    static async adminFromToken(token) {
        const session = await Session.findOne({token: token, isValid: true});
        if(!session){
            return null;
        }
        const admin = await User.findOne({_id: session.uid, isAdmin: true});
        return admin;
    }

    /**
     *
     * @param token
     * @return {Promise<boolean>}
     */
    static async logout(token) {
        const res = await Session.updateOne({ token: token},{ isValid: false}, (err) => {
            if(err){
                return false;
            }
        });
        if(res.n == 0){
            return false;
        }
        return true;
    }
}

module.exports = AuthController;
