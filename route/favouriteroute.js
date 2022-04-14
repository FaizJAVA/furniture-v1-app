const express=require('express');
const favouriteRoute=express.Router();
const favouriteControl=require('../controller/favouritecontrol');

favouriteRoute.post('/add',favouriteControl.Add);
favouriteRoute.get('/delete',favouriteControl.Delete);
favouriteRoute.get('/view',favouriteControl.View);
favouriteRoute.post('/remove',favouriteControl.Remove);

module.exports=favouriteRoute;