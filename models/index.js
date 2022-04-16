const mongoose = require('mongoose');
const messages = require('./message');

const connectDb=async ()=>{
try{
    await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("Database Connected Successfully")
}
catch (err) {
    console.log(err);
}
}   
const db={};
db.connectDb=connectDb;
db.messages=messages;
module.exports=db;