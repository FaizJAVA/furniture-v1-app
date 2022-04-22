const express=require('express');
const {body}=require('express-validator');
const userControl=require('../controller/usercontroller');

const userRouter=express.Router();

userRouter.post('/signup',body('name').not().isEmpty(),body('email').not().isEmpty(),
body('password').not().isEmpty(),userControl.SignUp);
userRouter.post('/signin',body('email').not().isEmpty(),body('password').not().isEmpty(),userControl.SignIn);
userRouter.get('/view',userControl.View);
userRouter.get('/delete',userControl.Remove);
userRouter.post('/update',userControl.Update);

module.exports=userRouter;