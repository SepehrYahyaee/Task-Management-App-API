const jwt = require('jsonwebtoken');
const { customErrorClass } = require('../providers');

function createToken(payload, secretKey, expireTime) {
    try {
        return jwt.sign(payload, secretKey, { expiresIn: expireTime });
    } catch (error) {
        throw new customErrorClass(`an error has been occured in JWT: ${error.message}`, 403);
    }
}

module.exports = createToken;