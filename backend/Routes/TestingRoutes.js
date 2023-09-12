const express=require("express")
const router=express.Router()
const authController=require("../Controller/AuthController")
const controller=require("../Controller/TestingController")

router.route("/testing").post(authController.protect,authController.restrictTo("user"),controller.createTest)


module.exports=router