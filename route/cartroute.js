const express=require('express');
const cartRoute=express.Router();
const cartControl=require('../controller/cartcontrol');

cartRoute.post('/add',cartControl.Add);
cartRoute.get('/delete',cartControl.Delete);
cartRoute.post('/view',cartControl.View);
cartRoute.post('/remove',cartControl.Remove);

module.exports=cartRoute;