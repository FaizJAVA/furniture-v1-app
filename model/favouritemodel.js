const mongoose=require('mongoose');

const schema=mongoose.Schema;

const favouriteSchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,required:true},
    product:[
        {type:schema.Types.ObjectId,ref:'product'}
    ],
    uid:{type:schema.Types.ObjectId,ref:'user'}

});

module.exports=mongoose.model('favourite',favouriteSchema);