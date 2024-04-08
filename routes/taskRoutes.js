const express = require('express');
const { auth } = require('../middlewares');
const { taskControllers } = require('../controllers');

const router = express.Router(); // api/task

router.route('/createTask')
    .post(
        auth,
        taskControllers.createTask,
    )

module.exports = router;