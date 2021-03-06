const userM=require('../model/usernew');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.SignUp=(request,response)=>{
    let a=request.body.uname;
    let b=request.body.uemail;
    let c=request.body.upassword;

    const error=validationResult(request);

    if(!error.isEmpty()){
        return response.status(403).json({error:error.array()});
    }

    userM.create({uname:a,uemail:b,upassword:c}).then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not saved'});        
    });
}

exports.SignIn=(request,response)=>{
    let a=request.body.email;
    let b=request.body.password;
    const error=validationResult(request);
    if(!error.isEmpty()){
        return response.status(403).json({error:error.array()});
    }
    userM.findOne({uemail:a,upassword:b}).then(result=>{
        const payload={subject:result._id};
        const token=jwt.sign(payload,'jdshhfdvjksndfs');
        if(result)
            return response.status(200).json({
                result:result,
                token:token
            });
        else
            return response.status(200).json("Invalid password Or email");
    }).catch(err=>{
        return response.status(500).json({error:'Not a valid user'});
    })
}

exports.View=(request,response)=>{
    userM.find().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Cannot Fetch'});
    })
}
exports.Remove=(request,response)=>{
    userM.deleteOne({_id:request.body.uid}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Cannot Fetch'});
    })
}

exports.Update=(request,response)=>{
    let a=request.body.name;
    let b=request.body.email;
    let c=request.body.password;

    userM.updateOne({_id:request.body.uid},{$set:{uname:a,uemail:b,upassword:c}}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Cannot Update'});
    })
}