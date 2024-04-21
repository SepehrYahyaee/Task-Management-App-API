const prisma = require('../db.js');

class TagService {
    db = prisma;

    createTag(name, byUser) {
        return this.db.tag.create({
            data: {
                name,
                byUser,
            }
        })
    }

    retrieveAllUserTags(id) {
        return this.db.tag.findMany({
            where: {
                byUser: id,
            }
        })
    }

    retrieveUserSpecificTag(tagId) {
        return this.db.tag.findUnique({
            where: {
                id: tagId,
            }
        })
    }

    updateTag(tagId, tagName) {
        return this.db.tag.update({
            where: {
                id: tagId,
            },
            data: {
                name: tagName,
            }
        })
    }

    deleteTag(tagId) {
        return this.db.tag.delete({
            where: {
                id: tagId,
            }
        })
    }

    getTagsOnTask(taskId) {
        return this.db.taskToTag.findMany({
            where: {
                taskId,
            },
            select: {
                tagId: true,
            }
        })
    }
}

module.exports = TagService;