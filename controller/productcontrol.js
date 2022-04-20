const productM=require('../model/productmodel');
const {validationResult}=require('express-validator');
const product=require('../model/productmodel');

exports.add=(request,response)=>{
    product.create({
        pName: request.body.pName,
        pPrice: request.body.pPrice*1,
        pImage: "http://localhost:3000/images/"+request.file.filename,        
        pDescription: request.body.pDescription,
        pKeyword: true,
        pDiscount: request.body.pDiscount*1,
        pOffers: request.body.pOffers,       
        pQuantity: request.body.pQuantity*1,
        catId: request.body.catId
    })
    .then((result) => {
        return response.status(200).json(result);
    })
    .catch((err) => {
        return response.status(500).json(err);
    });
};

exports.viewProducts=(request,response)=>{
    product.find()
    .then((result) => {
        return response.status(200).json(result);
    })
    .catch((err) => {
        return response.status(500).json(err);
    });
};

exports.deleteProduct=(request,response)=>{
    product.deleteOne({_id:request.params.id})
    .then((result) => {
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};

exports.editProduct=(request,response)=>{
    console.log(request.body);
    product.updateOne({_id:request.body.id},
    {
        $set:
        {
            pName: request.body.pName,
            pPrice: request.body.pPrice*1,
            pImage: "http://localhost:3000/images/"+request.file.filename,        
            pDescription: request.body.pDescription,
            pKeyword: true,
            pDiscount: request.body.pDiscount*1,
            pOffers: request.body.pOffers,       
            pQuantity: request.body.pQuantity*1,
            catId: request.body.catId
        }
    })
    .then((result) => {
        return response.status(200).json(result);
    })
    .catch((err) => {
        return response.status(500).json(err);
    });
};

exports.Comment=async (request,response)=>{
    let a=request.body.uId;
    let b=request.body.text;
    let c=request.body.pId;

    let comment=await product.findOne({_id:c});

    comment.pack_comment.push({user:a},{text:b});

    comment.save().then(result=>{   
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json(err);
    })
}

exports.RemoveComment=(request,response)=>{
    let a=request.body.pId;
    let b=request.body.uId;
    let c=request.body.textId;

    product.updateOne({_id:a},{$pullAll:[{pack_comment:{user:{_id:b},text:{_id:c}}}]}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json(err);
    });
}
exports.getProduct=(request,response)=>{
    product.find({_id:request.params.id})
    .then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
};
