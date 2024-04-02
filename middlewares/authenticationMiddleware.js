const { tokenVerifier } = require('../providers');
const { UserService } = require('../services');

const userService = new UserService();

async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) throw new Error('token is needed in header for authentication!');
        const payload = tokenVerifier(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);  
        if (payload) {
            req.user = await userService.retrieveUserByUserName(payload.userName);
            next()
        }      
    } catch (error) {
        throw new Error('something went wrong in authentication middleware!');
    }
}

module.exports = authentication;