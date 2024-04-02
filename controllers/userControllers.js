const { UserService } = require('../services');
const userService = new UserService();

async function register(req, res) {
    return res.send(`user has been created succesfully: ${await userService.createUser(req.body.userName, req.body.password)}`);
}

async function myProfile(req, res) {
    return res.send(await userService.getProfileById(req.params.id));
}

async function getUsers(req, res) {
    return res.send(await userService.retrieveAllUsers());
}

async function getUserById(req, res) {
    return res.send(await userService.retrieveUserById(req.params.id));
}

async function updateUser(req, res) {
    return res.send(await userService.updateUser(req.params.id, req.body));
}

async function deleteUser(req, res) {
    return res.send(`deleted user is: ${await userService.deleteUser(req.params.id)}`);
}

module.exports = {
    register,
    myProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}