const bc = require('bcrypt');

async function passwordHasher(password) {
    return bc.hash(password, await bc.genSalt(10));
}

module.exports = passwordHasher;