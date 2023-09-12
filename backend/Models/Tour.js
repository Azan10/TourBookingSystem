const mongoose=require('mongoose')

const tourSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    AverageRating:{
        type:Number,
        default:4.5
    },

    NumberofReviews:{
      type:Number,
      default:0
    },
    NumberofBooking:{
        type:Number
    },
    imageURL:{
        type:String
    },
    Startinfo:{
        LocationName:{
            type:String,
            required:true
        },
        Lat:{
            type:Number,
            required:true
        },
        Lon:{
            type:Number,
            required:true
        },
        StartingDate:{
            type:String
        }

    }})



    

const Tour = mongoose.model("Tours", tourSchema);

module.exports = Tour;
