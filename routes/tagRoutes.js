const express = require('express');
const { auth, validation } = require('../middlewares');
const { tagControllers } = require('../controllers');
const { errorHandler } = require('../middlewares');

const router = express.Router(); // api/tag

router.route('/createTag')
    .post(
        auth,
        ...validation.createTagValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(tagControllers.createTag),
);

router.route('/myTags')
    .get(
        auth,
        errorHandler.asyncErrorHandler(tagControllers.getAllMyTags),
);

router.route('/myTags/:id')
    .get(
        auth,
        errorHandler.asyncErrorHandler(tagControllers.getMySpecificTag),
    )
    .put(
        auth,
        ...validation.updateTagValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(tagControllers.updateTag),
    )
    .delete(
        auth,
        errorHandler.asyncErrorHandler(tagControllers.deleteTag),
);

module.exports = router;