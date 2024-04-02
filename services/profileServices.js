const prisma = require('../db.js');

class ProfileService {
    db = prisma;

    createProfile(id) {
        return this.db.profile.create({
            data: { id }
        })
    }

    getProfileById(id) {
        return this.db.profile.findUnique({
            where: { id }
        });
    }

    updateProfile(id, updateObject) {
        return this.db.profile.update({
            where: { id },
            data: updateObject
        })
    }

    deleteProfile(id) {
        return this.db.profile.delete({
            where: { id }
        })
    }
}

module.exports = ProfileService;