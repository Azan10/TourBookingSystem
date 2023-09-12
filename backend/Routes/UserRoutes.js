const express=require("express")
const authController=require("../Controller/AuthController")
const userController=require("../Controller/UserController")

const router=express.Router()

router.route("/update").patch(authController.protect,authController.restrictTo("user"),userController.upload.single("image"),userController.updateUser)
router.route("/me").get(authController.protect,authController.restrictTo("user","admin"),userController.getUser)

module.exports=router