const mongoose=require('mongoose');

const schema=mongoose.Schema;

const favouriteSchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,required:true,ref:'user'},
    productId:[
        {type:schema.Types.ObjectId,ref:'product'}
    ]
    
});

module.exports=mongoose.model('favourite',favouriteSchema);