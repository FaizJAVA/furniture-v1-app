const userM=require('../model/usermodel');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.SignUp=(request,response)=>{
    let a=request.body.uname;
    let b=request.body.uemail;
    let c=request.body.upassword;
    let d='http://localhost:3000/images/'+request.file.filename;

    const error=validationResult(request);

    if(!error.isEmpty()){
        return response.status(403).json({error:error.array()});
    }

    userM.create({uname:a,uemail:b,upassword:c,uimage:d}).then(result=>{
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
    userM.findOne({email:a,password:b}).then(result=>{
        const payload={subject:result._id};
        const token=jwt.sign(payload,'jdshhfdvjksndfs');
        return response.status(200).json({
            result:result,
            token:token
        });
    }).catch(err=>{
        console.log(err);
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
    let d='http://localhost:3000/images/'+request.file.filename;

    userM.updateOne({_id:request.body.uid},{$set:{uname:a,uemail:b,upassword:c,uimage:d}}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Cannot Update'});
    })
}