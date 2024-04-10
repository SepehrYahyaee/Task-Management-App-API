const { TaskService } = require('../services');

const taskService = new TaskService();

async function ownerChecker(taskId, userId) {
    const task = await taskService.retrieveUserSpecificTask(taskId);
    if (task.byUser === userId) return true;
    else return false;
}

module.exports = ownerChecker;