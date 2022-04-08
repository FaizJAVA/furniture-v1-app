const mongoose=require('mongoose');
const schema=mongoose.Schema;
const querySchema=new mongoose.Schema({
    userId:{type:schema.Types.ObjectId,ref:'user'},
    query:{type:String}
});
module.exports=mongoose.model('query',querySchema);