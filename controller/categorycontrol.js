const categoryM=require('../model/categorymodel');
const {validationResult}=require('express-validator');

exports.Add=(request,response)=>{
    let a=request.body.name;
    let b='http://localhost:3000/images/'+request.file.filename;

    const error=validationResult(request);

    if(!error.isEmpty()){
        return response.status(200).json({error:error.array()});
    }

    categoryM.create({catName:a,catImage:b}).then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Cannot added'});
    });
}

exports.View=(request,response)=>{
    
    adminM.find().then(result=>{
        return response.status(200).json(result);
        
    }).catch(err=>{
        return response.status(500).json({error:err});
    });
}

exports.Update=(request,response)=>{
    
    adminM.Update().then(result=>{
        return response.status(200).json(result);
        
    }).catch(err=>{
        return response.status(500).json({error:err});
    });
}
