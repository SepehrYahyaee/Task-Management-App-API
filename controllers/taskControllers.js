const { TaskService } = require('../services');

const taskService = new TaskService();

async function createTask(req, res) {
    const taskDetails = { ...req.body, byUser: req.user.id }
    const task = await taskService.createTask(taskDetails);
    return res.send(`task was successfully created: ${JSON.stringify(task)}`);
}

async function getAllMyTasks(req, res) {
    
}

module.exports = {
    createTask,

}