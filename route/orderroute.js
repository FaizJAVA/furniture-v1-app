const express=require("express");
const router=express.Router();
const orderController=require("../controller/ordercontrol");

router.post("/order",orderController.orderPlace);
router.get("/view",orderController.viewOrders);
router.post("/online",orderController.onlinepay);

//particular user ordr History
router.post("/userorderhistory",orderController.userOrderHistory);
//particular user order tracking
router.post("/userordertrack",orderController.userOrderTrack);

//all orders for admin
router.get("/allorders/",orderController.allOrders);
//all order history for admin
router.get("/allOrderHistory/",orderController.allOrdersHistory);

//update ordersStatus field for mange history
router.post("/orderstatus",orderController.orderStatus);


module.exports =router;