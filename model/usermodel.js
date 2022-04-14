const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    uname:{type:String,required:true},
    uemail:{type:String,trim:true,unique:true},
    umobile:{type:Number,trim:true,unique:true,required:true},
    upassword:{type:String,required:true,trim:true,unique:true},
    uimage:{type:String,required:true,trim:true},
    isBlock:{type:Boolean,default:false},
    uEmiStatus:{type:Boolean,default:false},
    uEmiCalc:{type:Number}
});

module.exports=mongoose.model('user',userSchema);