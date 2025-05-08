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
module.exports.register=async({firstName,lastName,company,email,image1,image2,phoneNumber,department,employeeName,employeeEmail,description,img1,img2})=>{
    //.then() is asynchronous, and try-catch only works for synchronous code, it won’t catch errors thrown inside a .then() chain.
    // In a URL query string, values like status=accept are always treated as strings automatically. Wrapping them in quotes ('accept' or "accept") will literally include the quotes in the value, which can break your backend logic if you're expecting accept and not 'accept'.
    try{
        const img1base64=fs.readFileSync(img1.path).toString('base64');
        const img2base64=fs.readFileSync(img2.path).toString('base64');
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
            <h2>New Employee Registered</h2>
        <p><strong>Name:</strong> ${details.fullName.firstName}</p>
        <p><strong>Company:</strong> ${details.company}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Phone:</strong> ${details.phoneNumber}</p>
        <p><strong>Department:</strong> ${details.department}</p>
        <p><strong>Employee Name:</strong> ${details.employeeName}</p>
        <p><strong>Employee Email:</strong> ${details.employeeEmail}</p>
        <p><strong>Description:</strong> ${details.description}</p>
        <img src="cid:img1" alt="QR Code" />
        <img src="cid:img2" alt="QR Code" />
        
        <p>Click below to respond:</p>
<a href="${process.env.BASE_URL}/respond?id=${details._id}&status=accept" 
   style="display: inline-block; padding: 8px 16px; background-color: green; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">
   Accept
</a>
<a href="${process.env.BASE_URL}/respond?id=${details._id}&status=decline" 
   style="display: inline-block; padding: 8px 16px; background-color: red; color: white; text-decoration: none; border-radius: 4px;">
   Decline
</a>

          `,
          attachments:[
            {
                content:img1base64,
                filename:img1.originalname,
                type:img1.mimetype,
                disposition:"inline",
                content_id:"img1"
            },
            {
                content:img2base64,
                filename:img2.originalname,
                type:img2.mimetype,
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
module.exports.generatePass=async(user)=>{
    const {fullName,description}=user;
    const name=`${fullName.firstName} ${fullName.lastName}`;
    const issueDate=new Date();
    console.log("hello",issueDate);
    const validTill=new Date(issueDate);
    validTill.setDate(issueDate.getDate()+7);
    const passData={
        name,
        issueDate,
        validTill,
        purposeOfVisit:description
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
    console.log(typeof issueDate,issueDate);
    const base64Image = qrCode.replace('data:image/png;base64,', '');
    const html=`
    <h2>Visitor Pass</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Issue Date:</strong> ${format(new Date(issueDate), 'PPP')}</p>
    <p><strong>Valid Till:</strong> ${format(new Date(validTill), 'PPP')}</p>
    <p><strong>Purpose of Visit:</strong> ${purposeOfVisit}</p>
    <p><strong>QR Code:</strong></p>
    <img src="cid:qrcode" alt="QR Code" />
    `
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
