const registerServices=require('../services/register.services');
const {validationResult}=require('express-validator');
const sanitize=require('mongo-sanitize');
module.exports.register=async(req,res)=>{
    
    req.body=sanitize(req.body);
    try{
        const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        throw new Error(errors.array());
    }
    const {fullName,email,password,phoneNumber,employeeName,employeeEmail,employeePhoneNumber}=req.body;
    const details=await registerServices.register({fullName,email,password,phoneNumber,employeeName,employeeEmail,employeePhoneNumber});
    res.json(details);
    }
    catch(error){
        throw new Error(error);
    }
   
}