const express = require('express');
const { userControllers } = require('../controllers');
const { auth, validation } = require('../middlewares');

const router = express.Router(); // api/user

router.route('/register')
    .post(
        ...validation.registerValidators,
        validation.validationErrorHandler,
        userControllers.register,
);

router.route('/login')
    .post(
        ...validation.loginValidators,
        validation.validationErrorHandler,
        userControllers.login,
);

router.route('/myProfile')
    .get(
        auth,
        userControllers.myProfile,
    )
    .put(
        auth,
        ...validation.updateProfileValidators,
        validation.validationErrorHandler,
        userControllers.updateMyProfile,
    ).patch(
        auth,
        ...validation.updateUserValidators,
        validation.validationErrorHandler,
        userControllers.updateUser,
    ).delete(
        auth,
        userControllers.deleteUser,
);

router.route('/')
    .get(
        userControllers.getUsers,
);

router.route('/:id')
    .get(
        userControllers.getUserById,
);

module.exports = router;