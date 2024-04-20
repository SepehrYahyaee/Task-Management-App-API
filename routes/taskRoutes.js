const express = require('express');
const { auth, validation } = require('../middlewares');
const { taskControllers } = require('../controllers');

const router = express.Router(); // api/task

router.route('/createTask')
    .post(
        auth,
        ...validation.createTaskValidators,
        validation.validationErrorHandler,
        taskControllers.createTask,
);

router.route('/myTasks')
    .get(
        auth,
        taskControllers.getAllMyTasks,
);

router.route('/myTasks/:id')
    .get(
        auth,
        taskControllers.getMySpecificTask,
    )
    .put(
        auth,
        ...validation.updateTaskValidators,
        validation.validationErrorHandler,
        taskControllers.updateTask,
    )
    .delete(
        auth,
        taskControllers.deleteTask,
);

router.route('/myTasks/:id/addTag')
    .post(
        auth,
        ...validation.addTagToTaskValidators,
        validation.validationErrorHandler,
        taskControllers.addTagToTask,
);

module.exports = router;