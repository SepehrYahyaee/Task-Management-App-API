const jwt = require('jsonwebtoken');

function verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
}

module.exports = verifyToken;