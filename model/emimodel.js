const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const emiSchema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    productId:[
        {}
    ]
});

module.exports=mongoose.model("emi",emiSchema);