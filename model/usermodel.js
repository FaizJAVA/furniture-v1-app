const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    uname:{type:String,required:true},
    uimage:{type:String,required:true,trim:true},
    uemail:{type:String,required:true,trim:true,unique:true},
    upassword:{type:String,required:true,trim:true,unique:true},
    isBlock:{type:Boolean,default:false}
});

module.exports=mongoose.model('user',userSchema);