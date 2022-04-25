const favouriteM=require('../model/favouritemodel');

exports.Add=async (request,response)=>{
    let uid=request.body.uId;
    let pid=request.body.pId;
    let cart=await favouriteM.findOne({userId:uid});

    if(!cart){
        cart=new favouriteM();
        cart.userId=uid;
    }
    cart.productId.push(pid);

    cart.save().then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        return response.status(500).json({error:'Not added to favourite'});
    });
}

exports.View=(request,response)=>{
    let a=request.body.uId;
    favouriteM.findOne({uesrId:a}).populate('productId').then(result=>{
        return response.status(200).json(result);
    }).catch(error=>{
        return response.status(500).json({error:'Not fetched'});
    });
}

exports.Remove=(request,response)=>{
    let a=request.body.uId;
    let b=request.body.pId;
    favouriteM.updateOne({userId:a},{$pullAll:[{productId:b}]}).then(result=>{
        return response.status(200).json();
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not removed'});
    })
}

exports.Delete=(request,response)=>{
    let a=request.body.uId;
    favouriteM.deleteOne({userId:a}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json({error:'not deleted'});
    })
}