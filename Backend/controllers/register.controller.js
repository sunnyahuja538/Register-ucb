const registerServices=require('../services/register.services');
const {validationResult}=require('express-validator');
const sanitize=require('mongo-sanitize');
const registerModel = require('../model/model');
const Pass = require('../model/pass');
const employeeModel = require('../model/employee-model');
module.exports.register=async(req,res)=>{
    
    req.body=sanitize(req.body);
    try{
        const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
        return res.status(400).json({errors:errors.array()});
    }
    // const img1=req.files['file1']?.[0];
    // const img2=req.files['file2']?.[0];
    //console.log(img1);
    const {firstName,lastName,company,email,image1,image2,department,phoneNumber,employeeName,employeeEmail,description}=req.body;
    const details=await registerServices.register({firstName,lastName,company,email,image1,image2,department,phoneNumber,employeeName,employeeEmail,description});
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
module.exports.respond=async(req,res)=>{
    const {status,id}=req.query;
    if(!id||!status)
    {
        return res.status(400).send("Invalid request");
    }
    const user=await registerModel.findById(id);
    if(!user)
    {
        return res.status(404).send("Record not found");
    }
        if(status==='accept')
        {
            const pass=await registerServices.generatePass(user,user.email);
            await registerServices.sendPassEmail(user.email,pass);
            return res.send('<h2>Accepted! A pass was generated and sent to the visitor.</h2>')
        }
        else if (status === 'decline') {
            return res.send(`<h2>You have declined the request.</h2>`);
          } else {
            return res.status(400).send("Invalid status");
          }
    }
    module.exports.checkout=async(req,res)=>{
        const {id}=req.query;
        const pass=await Pass.findById(id);
        if(!pass){
            res.status(404).send('pass not found');
        }
        const checkOutTime=new Date();
        pass.checkOutTime=checkOutTime;
        await pass.save();
        res.send(`
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Checkout Successful</h2>
                <p><strong>${pass.name}</strong>, your checkout was recorded at:</p>
                <p>${pass.checkOutTime}</p>
                <p>Thank you for visiting!</p>
            </div>
`);
}
module.exports.getDepartment=async(req,res)=>{
    try{
        const department=await employeeModel.distinct('department');
        console.log(department);
        res.json(department);
    }
    catch(err){
        throw new Error(err);
    }
}
