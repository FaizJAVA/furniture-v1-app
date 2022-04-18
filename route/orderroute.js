const express=require("express");
const router=express.Router();
const orderController=require("../controller/ordercontrol");

router.post("/order",orderController.orderPlace);
router.get("/view",orderController.viewOrders);

//particular user ordr History
router.get("/userorderhistory/:id",orderController.userOrderHistory);
//particular user order tracking
router.get("/userordertrack/:id",orderController.userOrderTrack);

//all orders for admin
router.get("/allorders/",orderController.allOrders);
//all order history for admin
router.get("/allOrderHistory/",orderController.allOrdersHistory);

//update ordersStatus field for mange history
router.post("/orderstatus/:orderId",orderController.orderStatus);


module.exports =router;