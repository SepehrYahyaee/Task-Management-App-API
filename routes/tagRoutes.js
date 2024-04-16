const express = require('express');
const { auth } = require('../middlewares');
const { tagControllers } = require('../controllers');

const router = express.Router(); // api/tag

router.route('/createTag')
    .post(
        auth,
        tagControllers.createTag
    )

router.route('/myTags')
    .get(
        auth,
        tagControllers.getAllMyTags
    )

router.route('/myTags/:id')
    .get(
        auth,
        tagControllers.getMySpecificTag
    )
    .put(
        auth,
        tagControllers.updateTag
    )
    .delete(
        auth,
        tagControllers.deleteTag
    )

module.exports = router;