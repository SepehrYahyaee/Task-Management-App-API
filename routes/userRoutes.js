const express = require('express');
const { userControllers } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router(); // api/user

router.route('/register').post(userControllers.register);
router.route('/login').post(userControllers.login);
router.route('/myProfile')
    .get(
        auth,
        userControllers.myProfile
    )
    .put(
        auth,
        userControllers.updateMyProfile
    ).patch(
        auth,
        userControllers.updateUser
    ).delete(
        auth,
        userControllers.deleteUser
    );
router.route('/').get(userControllers.getUsers);
router.route('/:id').get(userControllers.getUserById);

module.exports = router;