const mongoose=require('mongoose');
const schema=mongoose.Schema;
const productSchema=new mongoose.Schema({
    pName:{type:String,required:true},
    pPrice:{type:String,required:true,trim:true},
    pImage:{type:String,required:true,trim:true},
    pDescription:{type:String,required:true,trim:true},
    pKeyword:{type:String, required:true},
    pDiscount:{type:Number,trim:true},
    catId:{type:schema.Types.ObjectId,ref:'category'},
    pComment:[{
        text:{type:String},
        userId:Types.Schema.ObjectId,
        ref:"user"
    }]
});

module.exports=mongoose.model('product',adminSchema);