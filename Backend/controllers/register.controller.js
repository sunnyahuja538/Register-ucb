const registerServices=require('../services/register.services');
const {validationResult}=require('express-validator');
const sanitize=require('mongo-sanitize');
module.exports.register=async(req,res)=>{
    
    req.body=sanitize(req.body);
    try{
        const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
        return res.status(400).json({errors:errors.array()});
    }
    const {fullName,company,email,image1,image2,department,phoneNumber,employeeName,employeeEmail,description}=req.body;
    const details=await registerServices.register({fullName,company,email,image1,image2,department,phoneNumber,employeeName,employeeEmail,description});
    res.json(details);
    }
    catch (error) {
        console.error("Register Error:", error);
        throw new Error(error);
    }
   
}
module.exports.getEmployeeSuggestions=async(req,res)=>{
    try{
        const {department,query}=req.query;
        const suggestions=await registerServices.getEmployeeSuggestions(department,query);
        console.log(suggestions);
        res.json(suggestions);
    }
    catch(error){
        console.error("Error fetching employee suggestions:", error);
        throw new Error(error);
    }
}