const jwt = require('jsonwebtoken');

function createToken(payload, secretKey, expireTime) {
    try {
        return jwt.sign(payload, secretKey, { expiresIn: expireTime });
    } catch (error) {
        throw new Error(`an error has been occured in JWT: ${error.message}`);
    }
}

module.exports = createToken;