const adminM=require('../model/adminmodel');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.SignUp=(request,response)=>{
    let a=request.body.email;
    let b=request.body.password;

    const error=validationResult(request);

    if(!error.isEmpty()){
        return response.status(200).json({error:error.array()});
    }

    adminM.create({aEmail:a,aPassword:b}).then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not SignUp'});
    });
}

exports.SignIn=(request,response)=>{
    let a=request.body.email;
    let b=request.body.password;
    
    const error=validationResult(request);

    if(!error.isEmpty()){
        return response.status(200).json({error:error.array()});
    }
    adminM.findOne({aEmail:a,aPassword:b}).then(result=>{
        const payload={subject:result._id};
        const token=jwt.sign(payload,'sjdhsjfbddbfhdh');
        if(result){
            return response.status(200).json(
                {result:result,
                token:token
                }
            );
        }
        else{
            return response.status(200).json({error:err,message:'Not Valid Admin'});
        }
        
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:err});
    });
}

exports.view=(request,response)=>{
    adminM.find().then(result=>{
        return response.status(200).json(result);
    
        
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:err,message:'Not getting'});
    });
}

exports.Delete=(request,response)=>{
    adminM.deleteOne({_id:request.body.id}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:err,message:'Not Delete'});
    });
}

exports.Update=(request,response)=>{
    let a=request.body.email;
    let b=request.body.password;
    let c=request.body.id;
    adminM.updateOne({_id:c},{$set:{aEmail:a,aPassword:b}}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:err,message:'Not Updated'});
    });
}