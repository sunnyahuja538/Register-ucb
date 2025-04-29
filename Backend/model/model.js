const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    employeeName:{
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        }
    },
    employeeEmail:{
        type: String,
        required: true
    },
    employeePhoneNumber:{
        type: Number,
        required: true
    }
});
const  registerModel = mongoose.model('Register', registerSchema);
module.exports = registerModel;