const express = require('express');
const router=express.Router();
const emiController = require('../controller/emicontrol');

router.post("/emientry",emiController.emiEntry);

//emi for admin
router.get("/adminallemi",emiController.adminAllEmi);
router.get("/adminhistoryemi",emiController.adminHistoryEmi);

//emi for user
router.get("/useremi/:id",emiController.userEmi);
router.get("/userhistoryemi/:id",emiController.userHistoryEmi);

//monthly emi
router.post("/emiupdate/:id",emiController.emiUpdate);


module.exports =router;