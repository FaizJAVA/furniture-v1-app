const mongoose=require('mongoose');
const schema=mongoose.Schema;
const productSchema=new mongoose.Schema({
    pName:{type:String,required:true},
    pPrice:{type:Number,required:true,trim:true},
    pImage:{type:String,required:true,trim:true},
    pDescription:{type:String,required:true,trim:true},
    pKeyword:{type:String, required:true},
    pDiscount:{type:Number},
    pOffers:{type:String},
    pQuantity:{type:Number, required:true},
    catId:{type:schema.Types.ObjectId,ref:'category'},
    pack_comment:[
        {
            user:
            {
                type:schema.Types.ObjectId,
                ref:"users"
            },
            text:
            {
                type:String
            }
        }
    ],
});
module.exports=mongoose.model('product',productSchema);