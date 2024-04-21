const express = require('express');
const { auth, validation, errorHandler } = require('../middlewares');
const { taskControllers } = require('../controllers');

const router = express.Router(); // api/task

router.route('/createTask')
    .post(
        auth,
        ...validation.createTaskValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(taskControllers.createTask),
);

router.route('/myTasks')
    .get(
        auth,
        errorHandler.asyncErrorHandler(taskControllers.getAllMyTasks),
);

router.route('/myTasks/:id')
    .get(
        auth,
        errorHandler.asyncErrorHandler(taskControllers.getMySpecificTask),
    )
    .put(
        auth,
        ...validation.updateTaskValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(taskControllers.updateTask),
    )
    .delete(
        auth,
        errorHandler.asyncErrorHandler(taskControllers.deleteTask),
);

router.route('/myTasks/:id/addTag')
    .post(
        auth,
        ...validation.addTagToTaskValidators,
        validation.validationErrorHandler,
        errorHandler.asyncErrorHandler(taskControllers.addTagToTask),
);

module.exports = router;