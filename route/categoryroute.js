const express=require('express');
const {body}=require('express-validator');
const categoryRouter=express.Router();
const multer=require('multer');
const categoryControl=require('../controller/categorycontrol');

const storage=multer.diskStorage({
    destination:'public/images',
    filename:(request,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});


categoryRouter.post('/add',upload.single('image'),body('name').not().isEmpty(),categoryControl.Add);
categoryRouter.post('/update',categoryControl.Update);
categoryRouter.get('/view',categoryControl.View);

module.exports=categoryRouter;