const { body, param, query, validationResult, checkExact } = require('express-validator');
const CustomError = require('../public/customErrorClass.js');

function validationErrorHandler(req, res, next){
    try {
        const isValid = validationResult(req);
        if (!isValid.isEmpty()){
            const message = isValid.errors[0].msg;
            throw new CustomError(message, 450);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const registerValidators = [
    body('userName').isString().trim().escape().notEmpty().withMessage('username validation failed!'),
    body('password').isString().trim().escape().notEmpty().isStrongPassword().withMessage('password validation failed'),
    checkExact(),
];

const loginValidators = [
    body('userName').isString().trim().escape().notEmpty().withMessage('username validation failed!'),
    body('password').isString().trim().escape().notEmpty().withMessage('password validation failed'),
    checkExact(),
];

const updateProfileValidators = [
    body('image').optional().isString().trim().escape().withMessage('image link validation failed!'),
    body('dateOfBirth').optional().isDate().trim().escape().withMessage('Date of Birth validation failed!'),
    body('firstName').optional().isString().trim().escape().withMessage('First name validation failed!'),
    body('lastName').optional().isString().trim().escape().withMessage('Last name validation failed!'),
    checkExact(),
];

const updateUserValidators = [
    body('password').optional().isString().trim().escape().withMessage('password update validation failed!'),
    body('email').optional().isString().isEmail().escape().withMessage('email update validation failed'),
    checkExact(),
]

const createTaskValidators = [
    body('title').isString().trim().escape().withMessage('title validation failed!'),
    body('description').optional().isString().trim().escape().withMessage('description validation failed!'),
    body('dueDate').optional().isString().trim().escape().withMessage('Due Date validation failed!'),
    checkExact(),
];

const updateTaskValidators = [
    body('title').optional().isString().trim().escape().withMessage('title validation failed!'),
    body('description').optional().isString().trim().escape().withMessage('description validation failed!'),
    body('dueDate').optional().isString().trim().escape().withMessage('Due Date validation failed!'),
    body('status').optional().isString().trim().escape().isIn(['Done', 'Pending', 'Failed']).withMessage('status validation failed!'),
    checkExact(),
];

const addTagToTaskValidators = [
    body('tagId').isString().trim().escape().isUUID().withMessage('tagId validation failed!'),
    checkExact(),
];

const createTagValidators = [
    body('name').isString().trim().escape().withMessage('Tag name validation failed!'),
    checkExact(),
];

const updateTagValidators = [
    body('name').optional().isString().trim().escape().withMessage('Tag name validation failed!'),
    checkExact(),
];

module.exports = {
    validationErrorHandler,
    registerValidators,
    loginValidators,
    updateProfileValidators,
    updateUserValidators,
    createTaskValidators,
    updateTaskValidators,
    addTagToTaskValidators,
    createTagValidators,
    updateTagValidators,
}