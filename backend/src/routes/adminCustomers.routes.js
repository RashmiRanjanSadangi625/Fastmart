const express = require("express");
const router = express.Router();

const userController= require("../controller/user.controller");
const authenticate = require("../middleware/authenticate");

// router.post("/",authenticate,productController.createProduct);
// router.post("/creates",authenticate,productController.createMultipleProducts)
// router.delete("/delete/:id",authenticate,productController.deleteProduct);
// router.put("/:id",authenticate,productController.updateProduct)

router.get("/all",userController.getAllUsers); 

module.exports=router;