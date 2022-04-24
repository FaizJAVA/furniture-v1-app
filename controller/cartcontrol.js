const cartM=require('../model/cartmodel');

exports.Add=async (request,response)=>{
    let uid=request.body.uId;
    let pid=request.body.pId;
    let cart=await cartM.findOne({userId:uid});

    if(!cart){
        cart=new cartM();
        cart.userId=uid;
    }
    cart.productId.push(pid);

    cart.save().then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not added to cart'});
    });
}

exports.View=(request,response)=>{
    let a=request.body.uId;
    cartM.findOne({uesrId:a}).populate('productId').populate('userId').then(result=>{
        return response.status(200).json(result);
    }).catch(error=>{
        console.log(error)
        return response.status(500).json({error:'Not fetched'});
    });
}

exports.Remove=(request,response)=>{
    cartM.updateOne({userId:request.body.uId},
        {
            $pullAll:{
                ProductId:[{_id:request.body.pId}]
            }
        }    
    )
    .then((result) => {
        console.log(result);
        return response.status(200).json(result);
    })
    .catch((err) => {
        console.log(err)
        return response.status(500).json(err);
    });
}

exports.Delete=(request,response)=>{
    let a=request.body.uId;
    cartM.deleteOne({userId:a}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json({error:'not deleted'});
    })
}