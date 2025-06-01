const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get("/",authenticate,orderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,orderController.confirmedOrder)
router.put("/:orderId/ship",authenticate,orderController.shipOrders)
router.put("/:orderId/deliver",authenticate,orderController.deliverOrders)
router.put("/:orderId/cancelled",authenticate,orderController.cancelledOrders)
router.put("/:orderId/delete",authenticate,orderController.deleteOrders)

module.exports=router;