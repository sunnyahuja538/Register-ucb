const registerServices=require('../services/register.services');
module.exports.register=async(req,res)=>{
    try{
    const {fullName,email,password,phoneNumber,employeeName,employeeEmail,employeePhoneNumber}=req.body;
    const details=await registerServices.register({fullName,email,password,phoneNumber,employeeName,employeeEmail,employeePhoneNumber});
    res.json(details);
    }
    catch(error){
        throw new Error(error);
    }
   
}