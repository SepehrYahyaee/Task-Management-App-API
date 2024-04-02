const { UserService } = require('../services');
const bc = require('bcrypt');

const userService = new UserService();

async function loginChecker(userName, password) {
    const user = await userService.retrieveUserByUserName(userName);
    if (!user) throw new Error('user or password is wrong!');
    const verify = await bc.compare(password, user.password);
    if (!verify) throw new Error('user or password is wrong!');
    return true;
}

module.exports = loginChecker;