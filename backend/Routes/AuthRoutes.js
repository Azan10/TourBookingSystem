const express=require('express')
const controller=require('../Controller/AuthController')
const router=express.Router()


router.post("/signup",controller.signUp)
router.post("/login",controller.login)
router.post("/protect",controller.protect,controller.restrictTo("admin"))



module.exports=router
