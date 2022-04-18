const mongoose=require('mongoose');

const schema=mongoose.Schema;

const commentSchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,ref:'user'},
    productId:{type:schema.Types.ObjectId,ref:'product'},
    commentBox:{type:String}
});

module.exports=commentSchema;