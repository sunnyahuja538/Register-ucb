const dotenv=require('dotenv').config();
const db=require('./db/db');
db.connection();
const app = require('./app');
const http=require('http');
const server=http.createServer(app);
server.listen(process.env.NEW_PORT,()=>{
    console.log(`Server is running on port ${process.env.NEW_PORT}`);
});
