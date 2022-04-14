const express=require("express");
const router=express.Router();
const queryController=require("../controller/querycontrol");

router.post("/query",queryController.query);
router.get("/view",queryController.view);
router.get("/delete/:id",queryController.removeQuery);


module.exports =router;