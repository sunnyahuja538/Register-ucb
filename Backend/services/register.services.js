const registerModel = require('../model/model');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const client=twilio(process.env.SID,process.env.AUTH_TOKEN);
module.exports.register=async({fullName,email,password,phoneNumber,employeeName,employeeEmail,employeePhoneNumber})=>{
    try{
        const passwordHash=await bcrypt.hash(password,10);
        const details=await registerModel.create({fullName,email,password:passwordHash,phoneNumber,employeeName,employeeEmail,employeePhoneNumber});
        client.messages.create({
            body: `Hello ${employeeName.firstName} ${fullName.lastName}\n New User Registration:\nName: ${fullName.firstName} ${fullName.lastName}\nEmail: ${email}\nPhone: ${phoneNumber}Please contact the user as soon as possible.`,
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