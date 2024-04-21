const { TaskService } = require('../services');
const { ownerChecker } = require('../providers');

const taskService = new TaskService();

async function createTask(req, res) {
    const taskDetails = { ...req.body, byUser: req.user.id }
    const task = await taskService.createTask(taskDetails);
    return res.status(201).send(`task was successfully created: ${JSON.stringify(task)}`);
}

async function getAllMyTasks(req, res) {
    const allTasks = await taskService.retrieveAllUserTasks(req.user.id);
    return res.status(200).send(`user's tasks are: ${JSON.stringify(allTasks)}`);
}

async function getMySpecificTask(req, res) {
    if (await ownerChecker(req.params.id, req.user.id)) return res.send(await taskService.retrieveUserSpecificTask(req.params.id));
    else return res.status(200).send('UnAuthorized! you are not the owner of this task!');
}

async function updateTask(req, res) {
    if (await ownerChecker(req.params.id, req.user.id)) return res.send(await taskService.updateSpecificTask(req.params.id, req.body));
    else return res.status(201).send('UnAuthorized! you are not the owner of this task!');
}

async function deleteTask(req, res) {
    if (await ownerChecker(req.params.id, req.user.id)) return res.send(`deleted: ${await taskService.deleteSpecificTask(req.params.id)}`);
    else return res.status(204).send('UnAuthorized! you are not the owner of this task!');
}

async function addTagToTask(req, res) {
    if (await ownerChecker(req.params.id, req.user.id)) return res.send(await taskService.createTagToTask(req.params.id, req.body.tagId));
    else return res.status(201).send('UnAuthorized! you are not the owner of this task!'); 
}

module.exports = {
    createTask,
    getAllMyTasks,
    getMySpecificTask,
    updateTask,
    deleteTask,
    addTagToTask,
}