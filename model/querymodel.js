const mongoose=require('mongoose');
const schema=mongoose.Schema;
const querySchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,ref:'user'},
    query:{type:String},
    status:{type:Boolean}
});
module.exports=mongoose.model('query',querySchema);