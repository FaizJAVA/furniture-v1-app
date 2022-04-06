const mongoose=require('mongoose');
const schema=mongoose.Schema;
const querySchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId},
    comment:{type:String}
})