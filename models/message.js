const mongoose = require('mongoose');
const messageSchema=new mongoose.Schema({
    encText:{
        type:String,
    },
    passKey:{
        type:String
    },
    encryptStatus:{
        type:Boolean,
        default:true
    },
    sendDate:{
        type:Date,
        default:Date.now
    }

})
const messages=new mongoose.model('messages',messageSchema);
module.exports=messages;