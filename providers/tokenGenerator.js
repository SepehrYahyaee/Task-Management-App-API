const jwt = require('jsonwebtoken');
const CustomError = require('../public/customErrorClass.js');

function createToken(payload, secretKey, expireTime) {
    try {
        return jwt.sign(payload, secretKey, { expiresIn: expireTime });
    } catch (error) {
        throw new CustomError(`an error has been occured in JWT: ${error.message}`, 403);
    }
}

module.exports = createToken;