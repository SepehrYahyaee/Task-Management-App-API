const prisma = require('../db.js');

class UserService {
    db = prisma;

    createUser(userName, password) {
        return this.db.user.create({
            data: {
                userName,
                password
            }
        });
    }

    retrieveAllUsers() {
        return this.db.user.findMany({
            select: {
                userName: true,
            }
        });
    }

    retrieveUserByUserName(userName) {
        return this.db.user.findUnique({
            where: { userName }
        })
    }

    retrieveUserById(id) {
        return this.db.user.findUnique({
            where: { id }
        })
    }

    updateUser(id, updateObject) {
        return this.db.user.update({
            where: { id },
            data: updateObject
        })
    }

    deleteUser(id) {
        return this.db.user.delete({
            where: { id }
        })
    }

}

module.exports = UserService;