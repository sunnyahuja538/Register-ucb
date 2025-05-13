const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required:true
        },
        issueDate: {
            type: Date,
            required:true
        },
        validTill: {
            type: Date,
            required:true
        },
        purposeOfVisit: {
            type: String,
            required:true
        },
        visitorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Register'
        },
        qrCode: {
            type: String,
            required:true
        },
        checkOutTime:{
            type:Date
        }
    
});

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
