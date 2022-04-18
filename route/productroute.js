const express=require('express');
const productControl=require('../controller/productcontrol');
const productRouter=express.Router();

const multer=require('multer');
const storage=multer.diskStorage({
    destination:'public/images',
    filename:(request,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});

productRouter.post('/add',upload.single("pImage"),productControl.add);
productRouter.get('/view',productControl.viewProducts);
productRouter.get('/delete/:id',productControl.deleteProduct);
productRouter.post('/edit',upload.single("pImage"),productControl.editProduct);
productRouter.get('/comment',productControl.Comment);
productRouter.get('/removecomment',productControl.RemoveComment);

module.exports=productRouter;

