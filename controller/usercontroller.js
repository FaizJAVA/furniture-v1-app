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