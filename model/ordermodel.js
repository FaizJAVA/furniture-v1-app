const mongoose=require('mongoose');

const schema=mongoose.Schema;

const orderSchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,ref:'user'},
    productId:[
        {type:schema.Types.ObjectId,ref:'product'}
    ],
    shippingAddress:{type:String,required:true},
    mobileNo:{type:Number,required:true},
    orderQuantity:{type:Number,required:true},
    totalAmount:{type:Number,require:true},
    orderDate:{type:Date,required:true,trim:true},
    orderStatus:{type:String,required:true}
});

module.exports =mongoose.model('order',orderSchema);;