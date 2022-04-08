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

userRouter.post('/signup',upload.single('uimage'),body('name').not().isEmpty(),body('email').not().isEmpty(),
body('password').not().isEmpty(),userControl.SignUp);
userRouter.post('/signin',body('email').not().isEmpty(),body('password').not().isEmpty(),userControl.SignIn);
userRouter.get('/view',userControl.View);
userRouter.get('/delete',userControl.Remove);
userRouter.post('/update',upload.single('uimage'),userControl.Update);

module.exports=userRouter;