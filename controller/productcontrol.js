const productM=require('../model/productmodel');
const {validationResult}=require('express-validator');

exports.Add=(request,response)=>{
    let a=request.body.name;
    let b=request.body.price;
    let c=request.file.filename;
    let d=request.body.description;
    let e=request.body.keyword;
}