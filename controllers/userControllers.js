const { UserService, ProfileService } = require('../services');
const { passwordHasher, loginChecker, tokenGenerator } = require('../providers');

const userService = new UserService();
const profileService = new ProfileService();

async function register(req, res) {
    const user = await userService.createUser(req.body.userName, await passwordHasher(req.body.password));
    await profileService.createProfile(user.id);
    return res.status(201).send(`user has been created succesfully: ${user}`);
}

async function login(req, res) {
    await loginChecker(req.body.userName, req.body.password);
    return res.status(202).send(tokenGenerator({ userName: req.body.userName }, process.env.SECRET_KEY, process.env.EXPIRE_TIME));
}

async function myProfile(req, res) {
    return res.status(200).send(await profileService.getProfileById(req.user.id));
}

async function updateMyProfile(req, res) {
    return res.status(201).send(await profileService.updateProfile(req.user.id, req.body));
}

async function getUsers(req, res) {
    return res.status(200).send(await userService.retrieveAllUsers());
}

async function getUserById(req, res) {
    return res.status(200).send(await userService.retrieveUserById(req.params.id));
}

async function updateUser(req, res) {
    return res.status(201).send(await userService.updateUser(req.user.id, req.body));
}

async function deleteUser(req, res) {
    await profileService.deleteProfile(req.user.id);
    return res.status(204).send(`deleted user is: ${await userService.deleteUser(req.user.id)}`);
}

module.exports = {
    register,
    login,
    myProfile,
    updateMyProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}