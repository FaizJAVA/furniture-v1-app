const express=require("express");
const router=express.Router();
const queryController=require("../controller/querycontrol");

router.get("/query",queryController.query);


module.exports =router;