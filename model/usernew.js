const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new mongoose.Schema({
    uname:{type:String,required:true},
    uemail:{type:String,trim:true,unique:true},
    upassword:{type:String,required:true,trim:true,unique:true},
});

module.exports=mongoose.model('user',userSchema);