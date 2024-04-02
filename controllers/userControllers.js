const { UserService, ProfileService } = require('../services');
const { passwordHasher } = require('../providers');
const userService = new UserService();
const profileService = new ProfileService();

async function register(req, res) {
    const hashedPassword = await passwordHasher(req.body.password);
    const user = await userService.createUser(req.body.userName, hashedPassword);
    await profileService.createProfile(user.id);
    return res.send(`user has been created succesfully: ${user}`);
}

async function myProfile(req, res) {
    return res.send(await profileService.getProfileById(req.params.id));
}

async function updateMyProfile(req, res) {
    return res.send(await profileService.updateProfile(req.params.id, req.body));
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
    await profileService.deleteProfile(req.params.id);
    return res.send(`deleted user is: ${await userService.deleteUser(req.params.id)}`);
}

module.exports = {
    register,
    myProfile,
    updateMyProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}