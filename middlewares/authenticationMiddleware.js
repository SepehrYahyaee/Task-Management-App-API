const { tokenVerifier } = require('../providers');
const { UserService } = require('../services');
const CustomError = require('../public/customErrorClass.js');

const userService = new UserService();

async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) throw new CustomError('token is needed in header for authentication!', 400);
        const payload = tokenVerifier(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);  
        if (payload) {
            req.user = await userService.retrieveUserByUserName(payload.userName);
            next()
        }      
    } catch (error) {
        next(new CustomError('something went wrong in authentication middleware!', 403));
    }
}

module.exports = authentication;