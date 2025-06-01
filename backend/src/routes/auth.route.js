const express = require("express")
const router = express.Router();
const authController= require('../controller/auth.controller')

const app=express()

router.post("/signup",authController.register)
router.post("/signin",authController.login)
router.post("/forgotPassword",authController.forgotPassword) 
router.post("/resetPassword",authController.resetPassword)
router.post("/admin/signin",authController.adminLogin)

module.exports=router