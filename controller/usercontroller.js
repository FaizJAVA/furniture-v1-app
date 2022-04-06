const userM=require('../model/usermodel');

exports.SignUp=(request,response)=>{
    let a=request.body.uname;
    let b=request.body.uemail;
    let c=request.body.upassword;
    let d='http://localhost:3000/images/'+request.file.filename;

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

    userM.findOne({email:a,password:b}).then(result=>{
        return response.status(200).json(result);
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