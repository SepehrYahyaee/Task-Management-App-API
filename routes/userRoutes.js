const express = require('express');
const { userControllers } = require('../controllers');

const router = express.Router(); // api/user

router.route('/register').post(userControllers.register);
router.route('/:id/myProfile').get(userControllers.myProfile);
router.route('/').get(userControllers.getUsers);
router.route('/:id').get(userControllers.getUserById).put(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports = router;