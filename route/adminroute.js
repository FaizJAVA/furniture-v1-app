const express=require('express');
const {body}=require('express-validator');
const adminRouter=express.Router();
const adminControl=require('../controller/admincontrol');

adminRouter.post('/signup',body('email').not().isEmpty(),body('password').not().isEmpty(),adminControl.SignUp);
adminRouter.post('/signin',body('email').not().isEmpty(),body('password').not().isEmpty(),adminControl.SignIn);
adminRouter.get('/view',adminControl.view);
adminRouter.get('/delete',body('id').not().isEmpty(),adminControl.Delete);
adminRouter.post('/update',body('name').not().isEmpty(),body('email').not().isEmpty(),body('password').not().isEmpty(),adminControl.Update);



module.exports=adminRouter;