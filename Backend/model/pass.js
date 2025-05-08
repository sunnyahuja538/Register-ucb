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
        qrCode: {
            type: String,
            required:true
        },
    
});

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
