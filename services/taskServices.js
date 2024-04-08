const prisma = require('../db.js');

class TaskService {
    db = prisma;

    createTask(taskDetails) {
        return this.db.task.create({
            data: taskDetails,
        });
    }

    retrieveTasks(id) {
        return this.db.task.findMany({
            where: { byUser: id }
        })
    }
}

module.exports = TaskService;