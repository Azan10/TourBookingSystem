const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    Tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour"
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
    
})

const Booking=mongoose.model("bookings",bookingSchema)

module.exports=Booking