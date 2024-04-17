const prisma = require('../db.js');

class TaskService {
    db = prisma;

    createTask(taskDetails) {
        return this.db.task.create({
            data: taskDetails,
        });
    }

    retrieveAllUserTasks(id) {
        return this.db.task.findMany({
            where: { byUser: id }
        })
    }

    retrieveUserSpecificTask(taskId) {
        return this.db.task.findUnique({
            where: { id: taskId }
        })
    }

    updateSpecificTask(taskId, updateObject) {
        return this.db.task.update({
            where: { id: taskId },
            data: updateObject,
        })
    }

    deleteSpecificTask(taskId) {
        return this.db.task.delete({
            where: { id: taskId }
        })
    }

    createTagToTask(taskId, tagId) {
        return this.db.taskToTag.create({
            data: {
                taskId,
                tagId,
            }
        })
    }
}

module.exports = TaskService;