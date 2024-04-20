const express = require('express');
const { auth, validation } = require('../middlewares');
const { tagControllers } = require('../controllers');

const router = express.Router(); // api/tag

router.route('/createTag')
    .post(
        auth,
        ...validation.createTagValidators,
        validation.validationErrorHandler,
        tagControllers.createTag,
);

router.route('/myTags')
    .get(
        auth,
        tagControllers.getAllMyTags,
);

router.route('/myTags/:id')
    .get(
        auth,
        tagControllers.getMySpecificTag,
    )
    .put(
        auth,
        ...validation.updateTagValidators,
        validation.validationErrorHandler,
        tagControllers.updateTag,
    )
    .delete(
        auth,
        tagControllers.deleteTag,
);

module.exports = router;