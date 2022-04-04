const express=require('express');
const {body}=require('express-validator');
const userControl=require('../controller/usercontroller');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:'public/images',
    filename:(request,file,cb)=>{
        cb(null,Date.now()+' '+file.originalname);
    }
});

const upload=multer({storage:storage});

const userRouter=express.Router();

userRouter.post('/signup',upload.single('uimage'),userControl.SignUp);

module.exports=userRouter;