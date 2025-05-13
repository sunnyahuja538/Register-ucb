const registerModel = require('../model/model');
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const employeeModel = require('../model/employee-model');
const client=twilio(process.env.SID,process.env.AUTH_TOKEN);
const sgMail=require('@sendgrid/mail');
const fs=require('fs');
sgMail.setApiKey(process.env.MAIL_API_KEY);
const {format}=require('date-fns');
const Pass=require('../model/pass');
const QRCode=require('qrcode');
module.exports.register=async({firstName,lastName,company,email,image1,image2,phoneNumber,department,employeeName,employeeEmail,description})=>{
    //.then() is asynchronous, and try-catch only works for synchronous code, it won’t catch errors thrown inside a .then() chain.
    // In a URL query string, values like status=accept are always treated as strings automatically. Wrapping them in quotes ('accept' or "accept") will literally include the quotes in the value, which can break your backend logic if you're expecting accept and not 'accept'.
    try{
        // const img1base64=fs.readFileSync(img1.path).toString('base64');
        // const img2base64=fs.readFileSync(img2.path).toString('base64');
        const img1 = image1.replace('data:image/jpeg;base64,', '');
        const img2 = image2.replace('data:image/jpeg;base64,', '');


        const details=await registerModel.create({fullName:{
            firstName,
            lastName
        }
        ,company,email,image1,image2,phoneNumber,department,employeeName,employeeEmail,description});
        // client.messages.create({
        //     body: `hello`,
        //     from: "+16602855573",
        //     to: "+917974931024"
        // })
        // .then(message => console.log(message.sid));
        const msg={
            to:'sunnyahuja538@gmail.com',
            from:'sunnyahuja538@gmail.com',
            subject:"New Employee",
            text: `and easy to do anywhere, even with Node.js`,
            html: `
            <div style="max-width: 500px; margin: auto; font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
  <div style="display: flex; justify-content: space-around; align-items: flex-start; gap: 50px;">
    <!-- Details Section -->
    <div style="width:50%; mr-16%;">
      <h2 style="margin-bottom: 16px; color: #222;">New Employee Registered</h2>
      <p><strong>Name:</strong> ${details.fullName.firstName}</p>
      <p><strong>Company:</strong> ${details.company}</p>
      <p><strong>Email:</strong> <a href="mailto:${details.email}" style="color: #007BFF;">${details.email}</a></p>
      <p><strong>Phone:</strong> ${details.phoneNumber}</p>
      <p><strong>Department:</strong> ${details.department}</p>
      <p><strong>Employee Name:</strong> ${details.employeeName}</p>
      <p><strong>Employee Email:</strong> <a href="mailto:${details.employeeEmail}" style="color: #007BFF;">${details.employeeEmail}</a></p>
      <p><strong>Description:</strong> ${details.description}</p>
    </div>

    <!-- Image Section -->
    <div style="flex-shrink: 0;">
      <img src="cid:img1" alt="Employee Image" style="width: 120px; height: 120px; border-radius: 12px; object-fit: cover;" />
    </div>
  </div>

  <p style="margin-top: 30px;">Click below to respond:</p>
  <div>
    <a href="${process.env.BASE_URL}/respond?id=${details._id}&status=accept" 
       style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">
       ✅ Accept
    </a>
    <a href="${process.env.BASE_URL}/respond?id=${details._id}&status=decline" 
       style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 4px;">
       ❌ Decline
    </a>
  </div>
</div>

          `,
          attachments:[
            {
                content:img1,
                filename:'photo',
                type:'image/jpeg',
                disposition:"inline",
                content_id:"img1"
            },
            {
                content:img2,//only expects base64 data
                filename:'idproof',
                type:'image/jpeg',
                disposition:"inline",
                content_id:"img2"
            }
          ]
        }
        sgMail.send(msg).then(()=>{
            console.log('Email sent');
        }).catch((error)=>{
            console.log(error.response.body.errors);
        })
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
module.exports.generatePass=async(user,email)=>{
    const {fullName,description}=user;
    const name=`${fullName.firstName} ${fullName.lastName}`;
    const issueDate=new Date();
    console.log("hello",issueDate);
    const validTill=new Date(issueDate);
    validTill.setDate(issueDate.getDate()+7);
    let visitor=registerModel.findOne({email})
    const passData={
        name,
        issueDate,
        validTill,
        purposeOfVisit:description,
        visitorId:visitor._id
    }
    const qrPayload=JSON.stringify(passData);
    const qrCode=await QRCode.toDataURL(qrPayload);
    const newPass=await Pass.create({
        ...passData,
        qrCode
    })
    console.log("Pass:",newPass);
    return newPass;
}
module.exports.sendPassEmail=async(email,pass)=>{
    try{
        
    const {name,issueDate,validTill,purposeOfVisit,qrCode}=pass;
    //console.log(typeof issueDate,issueDate);
    const base64Image = qrCode.replace('data:image/png;base64,', '');
    const html=`<div style="font-family: Arial, sans-serif; border: 1px solid #ccc; padding: 20px; max-width: 500px; margin: auto; background-color: #f9f9f9;">
    <h2 style="text-align: center; color: #2c3e50;">Visitor Pass</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Issue Date:</strong> ${format(new Date(issueDate), 'PPP')}</p>
    <p><strong>Valid Till:</strong> ${format(new Date(validTill), 'PPP')}</p>
    <p><strong>Purpose of Visit:</strong> ${purposeOfVisit}</p>

    <div style="margin-top: 20px;">
        <p><strong>QR Code:</strong></p>
        <img src="cid:qrcode" alt="QR Code" style="display: block; margin: 0 auto; width: 150px; height: 150px;" />
    </div>

     <div style="text-align: center; margin-top: 30px;">
         <a href="${process.env.BASE_URL}/checkout?id=${pass._id}" 
            style="display: inline-block; padding: 10px 20px; background-color: #2980b9; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
             Check Out
        </a>
 </div>
</div>`

    const msg={
        to:'sunnyahuja538@gmail.com',
        from:'sunnyahuja538@gmail.com',
        subject: 'Your Visitor Pass',
        html,
        attachments:[
            {
                content:base64Image,
                filename:"qrcode.png",
                type:"image/png",
                disposition:"inline",
                content_id:"qrcode"
            }
        ]
    }
    await sgMail.send(msg);
    console.log('passmailsend');
    }
    catch(err){
        throw new Error(err);
    }
}
