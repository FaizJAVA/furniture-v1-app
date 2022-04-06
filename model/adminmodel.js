const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
    aEmail:{type:String,required:true},
    aPassword:{type:String,required:true,trim:true},
    
});

module.exports=mongoose.model('admin',adminSchema);