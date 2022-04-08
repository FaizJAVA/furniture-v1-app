const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const userRouter=require('./route/userroute');
const adminRouter=require('./route/adminroute');
const categoryRouter=require('./route/categoryroute');
const productRouter=require('./route/productroute');
const path=require('path');

const port=process.env.PORT|| 3000;
mongoose.connect('mongodb+srv://Faizaankhan:faiz123@furniture-v1-app-cluste.xufke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(result=>{
    console.log('success');
}).catch(err=>{
    console.log(err);
});

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/user/',userRouter);
app.use('/api/admin/',adminRouter);
app.use('/api/category/',categoryRouter);
app.use('/api/product/',productRouter);

app.listen(port,()=>{
    console.log('server running');
});