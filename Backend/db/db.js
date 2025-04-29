const mongoose = require('mongoose');
module.exports.connection = async() =>{
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected');
}
catch(error){
    throw new Error(error);
}
}