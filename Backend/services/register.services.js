const registerModel = require('../model/model');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const client=twilio(process.env.SID,process.env.AUTH_TOKEN);
module.exports.register=async({fullName,email,phoneNumber,employeeName,employeeEmail,employeePhoneNumber})=>{
    try{
        const details=await registerModel.create({fullName,email,phoneNumber,employeeName,employeeEmail,employeePhoneNumber});
        client.messages.create({
            body: `\nHello ${employeeName.firstName.charAt(0).toUpperCase()+employeeName.firstName.slice(1).toLowerCase()} ${employeeName.lastName}\n New User Registration:\nName: ${fullName.firstName.charAt(0).toUpperCase()+fullName.firstName.slice(1).toLowerCase()} ${fullName.lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\nPlease contact the user as soon as possible.`,
            from: "+16602855573",
            to: "+91"+employeePhoneNumber
        })
        .then(message => console.log(message.sid));
        return details;
    }
    
   
    catch(error){
       throw new Error(error);
    }
}