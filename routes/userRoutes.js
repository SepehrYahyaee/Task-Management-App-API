const express = require('express');
const { userControllers } = require('../controllers');
const { auth, validation, errorHandler } = require('../middlewares');

const router = express.Router(); // api/user

router.route('/register')
    .post(
        ...validation.registerValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(userControllers.register),
);

router.route('/login')
    .post(
        ...validation.loginValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(userControllers.login),
);

router.route('/myProfile')
    .get(
        auth,
        errorHandler.asyncErrorHandler(userControllers.myProfile),
    )
    .put(
        auth,
        ...validation.updateProfileValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(userControllers.updateMyProfile),
    ).patch(
        auth,
        ...validation.updateUserValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(userControllers.updateUser),
    ).delete(
        auth,
        errorHandler.asyncErrorHandler(userControllers.deleteUser),
);

router.route('/')
    .get(
        errorHandler.asyncErrorHandler(userControllers.getUsers),
);

router.route('/:id')
    .get(
        errorHandler.asyncErrorHandler(userControllers.getUserById),
);

module.exports = router;