const express = require('express');
const registerController = require('../controllers/register.controller');
const router = express.Router();
const {body}=require('express-validator');
router.post('/register',
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName,first').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    registerController.register);

module.exports=router;