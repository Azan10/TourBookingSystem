const express=require("express")
const controller=require("../Controller/TourController")
const authController=require("../Controller/AuthController")

const router=express.Router()

router.route("/tour")
.post(authController.protect,authController.restrictTo("admin"),controller.createTour)
.get(authController.protect,authController.restrictTo("admin","user"),controller.getallTours)

router.route("/tour/:id")
.get(authController.protect,authController.restrictTo("admin","user"),controller.getTourbyId)
.patch(authController.protect,authController.restrictTo("admin"),controller.updateTour)
.delete(authController.protect,authController.restrictTo("admin"),controller.deleteTour)


module.exports=router


