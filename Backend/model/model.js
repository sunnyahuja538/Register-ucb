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
    phoneNumber:{
        type: Number,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    ,
    image1:{
        type: String,
        required: true
    },
    image2:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    employeeName:{
        type: String,
        required: true
    },
    employeeEmail:{
        type: String,
        required: true
    },
    
    description:{
        type: String,
        required: true
    }
});
const  registerModel = mongoose.model('Register', registerSchema);
module.exports = registerModel;