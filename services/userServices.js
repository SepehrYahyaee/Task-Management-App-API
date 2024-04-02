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

    getProfileById(id) {
        return this.db.profile.findUnique({
            where: { id }
        })
    }

    retrieveAllUsers() {
        return this.db.user.findMany({});
    }

    retrieveUserById(id) {
        return this.db.user.findUnique({
            where: { id }
        })
    }

    updateUser(id, update) {
        return this.db.user.update({
            where: { id },
            data: update
        })
    }

    deleteUser(id) {
        return this.db.user.delete({
            where: { id }
        })
    }

}

module.exports = UserService;