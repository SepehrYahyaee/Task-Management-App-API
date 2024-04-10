const express = require('express');
const { auth } = require('../middlewares');
const { taskControllers } = require('../controllers');

const router = express.Router(); // api/task

router.route('/createTask')
    .post(
        auth,
        taskControllers.createTask,
    )

router.route('/myTasks')
    .get(
        auth,
        taskControllers.getAllMyTasks,
    )

router.route('/myTasks/:id')
    .get(
        auth,
        taskControllers.getMySpecificTask,
    )
    .put(
        auth,
        taskControllers.updateTask,
    )
    .delete(
        auth,
        taskControllers.deleteTask,
    )

module.exports = router;