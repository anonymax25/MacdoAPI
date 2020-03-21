const crypto = require('crypto');

class SecurityUtils {
    /**
     *
     * @param password {string}
     * @return {string}
     */
    static hashPassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);

        return hash.digest("hex").toString();
    }

    static randomToken() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(27, ((err, buf) => {
                if (err) {
                    reject(err);
                    return null;
                }
                resolve(buf.toString("hex"));
            }));
        });
    }
}

module.exports = SecurityUtils;
