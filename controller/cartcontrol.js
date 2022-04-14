const cartM=require('../model/cartmodel');

exports.Add=(request,response)=>{
    let uid=request.body.uId;
    let pid=request.body.pId;
    const cart=cartM.findOne({userId:uid});

    if(!cart){
        cart=new cartM();
        cart.userId=uid;
    }
    cart.productId.push(pid);

    cart.save().then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        return response.status(500).json({error:'Not added to cart'});
    });
}

exports.View=(request,response)=>{
    let a=request.body.uId;
    cartM.findOne({uesrId:a}).populate('productId').then(result=>{
        return response.status(200).json(result);
    }).catch(error=>{
        return response.status(500).json({error:'Not fetched'});
    });
}

exports.Remove=(request,response)=>{
    let a=request.body.uId;
    let b=request.body.pId;
    cartM.updateOne({userId:a},{$pullAll:[{productId:b}]}).then(result=>{
        return response.status(200).json();
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not removed'});
    })
}

exports.Delete=(request,response)=>{
    let a=request.body.uId;
    cartM.deleteOne({userId:a}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json({error:'not deleted'});
    })
}