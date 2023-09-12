const express = require("express");
const router = express.Router();
const controller = require("../Controller/UserBookingController");
const authController = require('../Controller/AuthController');


router.get("/userBooking",authController.protect,authController.restrictTo("user"),controller.getAllBookings)


module.exports=router