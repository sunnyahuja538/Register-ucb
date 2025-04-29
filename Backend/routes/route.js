const express = require('express');
const registerController = require('../controllers/register.controller');
const router = express.Router();
const {body}=require('express-validator');
router.post('/register',
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('fullName.lastName').isLength({min:3}).withMessage('Name nust be at least 3 characters long'),
    body('employeeName.firstName').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('employeeName.lastName').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('phoneNumber').isNumeric().withMessage('Phone number must '),
    body('employeePhoneNumber').isNumeric().withMessage('PhoneNumber must be a number'),
    registerController.register);

module.exports=router;