const message=require('../models/index');
const {encrypt,decrypt}=require('../helpers/calc');
const{messages}=message;
exports.sendEncryptMessage=async (req,res)=>{
    const{text,passKey}=req.body;
    try{
    const encText=await encrypt(text.trim(),passKey,6);
    const message=await messages.create({ encText,passKey });
    req.flash('success', 'Message Encrypted successfully!');
    }catch(e){
        req.flash('error', e.message);
    }
    
    res.redirect("/");
    
}
exports.getDecryptMessage=async (req,res)=>{
    const {id}=req.params;
    const {passKey}=req.body;
    try{
    const message=await messages.findById(id);
    if(message.passKey===passKey)
    {
        const decText=await decrypt(message.encText,passKey,6);
        
        message.encText=decText;
        message.encryptStatus=false;
        await message.save();
        req.flash('success', 'Message decrypted successfully');
    }
    else
        req.flash('error',`Invalid PassKey`);
    }
    catch(err){
        req.flash('error',err.message)
    }
    res.redirect("/")

}
exports.getAllMessages=async (req,res)=>{
    let data=[];
    try{
    data=await messages.find();
    }
    catch(err){
        req.flash('error',err.message);
    }   
    res.render("dashboard/home",{data})
}