const { UserService } = require('../services');
const { customErrorClass } = require('../providers');
const bc = require('bcrypt');

const userService = new UserService();

async function loginChecker(userName, password) {
    const user = await userService.retrieveUserByUserName(userName);
    if (!user) throw new customErrorClass('user or password is wrong!', 400);
    const verify = await bc.compare(password, user.password);
    if (!verify) throw new customErrorClass('user or password is wrong!', 400);
    return true;
}

module.exports = loginChecker;