const registerModel = require('../model/model');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const employeeModel = require('../model/employee-model');
const client=twilio(process.env.SID,process.env.AUTH_TOKEN);
module.exports.register=async({fullName,company,email,image1,image2,phoneNumber,department,employeeName,employeeEmail,description})=>{
    //.then() is asynchronous, and try-catch only works for synchronous code, it won’t catch errors thrown inside a .then() chain.
    try{
        const details=await registerModel.create({fullName,company,email,image1,image2,phoneNumber,department,employeeName,employeeEmail,description});
        // client.messages.create({
        //     body: `hello`,
        //     from: "+16602855573",
        //     to: "+917974931024"
        // })
        // .then(message => console.log(message.sid));
         return details;
    }
    
   
    catch(error){
       throw new Error(error);
    }
}
module.exports.getEmployeeSuggestions=async(department,query)=>{
    try{
        const suggestions=await employeeModel.find({
            department,
            name:{$regex:query,$options:"i"}
        })
        return suggestions;
    }
    catch(err){
        throw new Error(err);
    }
}