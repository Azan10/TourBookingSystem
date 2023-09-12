const express=require("express")
const router=express.Router()
const authController=require('../Controller/AuthController')
const controller=require("../Controller/ReviewController")


router.route("/tour/:tourId/reviews")
.post(authController.protect,authController.restrictTo("user"),controller.createReview)//create review by getting tourid from param
.get(authController.protect,authController.restrictTo("user","admin"),controller.getReviewsbyTourId)
                                                                //get all reviews that belong to specific tour

                                                  
router.route("/user/reviews")
.get(authController.protect,authController.restrictTo("user"),controller.getReviewsbyUserId)  // get all reviews that belong to specific user
 
router.route("/user/reviews/:id")
.patch(authController.protect,authController.restrictTo("user"),controller.updateReview)  //edit specific review
.delete(authController.protect,authController.restrictTo("user"),controller.deleteReview)   // delete specific review


module.exports=router