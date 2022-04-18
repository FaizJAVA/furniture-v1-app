const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const emiSchema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    emiInstallment:{type:Number},
    emiMonth:{type:Number,default:0},
    emiIntrest:{type:Number},
    emiTotal:{type:Number,default:0},
    emiDownPayment:{type:Number,required:true},
    emiRemaining:{type:Number}
});

module.exports=mongoose.model("emi",emiSchema);