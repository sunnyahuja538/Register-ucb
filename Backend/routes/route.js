const express = require('express');
const registerController = require('../controllers/register.controller');
const router = express.Router();
const multer=require('multer');
const {body}=require('express-validator');
const upload=multer({dest:'uploads/'});
router.post('/register',
    // upload.fields([{name:'file1'},{name:'file2'}]),

    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').notEmpty().withMessage('Name should not be empty').bail().isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('lastName').isLength({min:3}).withMessage('Name nust be at least 3 characters long'),
    body('company').notEmpty().withMessage('company is required'),
    body('employeeName').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('image1').notEmpty().withMessage('image is required'),
    body('image2').notEmpty().withMessage('image is required'),
    //body('employeeEmail').isEmail().withMessage('Invalid Email'),
    body('description').isLength({min:3}).withMessage('Description must be at least 3 characters long'),
    body('department').notEmpty().withMessage('department is required'),
    //body('employeeName.lastName').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('phoneNumber').isNumeric().withMessage('Phone number must '),
    registerController.register);
    router.get('/employee-suggestions',registerController.getEmployeeSuggestions);
    router.get('/respond',registerController.respond);
    router.get('/checkout',registerController.checkout);
    router.get('/departments',registerController.getDepartment);
    

module.exports=router;