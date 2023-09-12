const mongoose=require("mongoose")

const testingSchema=new mongoose.Schema({

    
    Name:{
        type:String
    }

    
})
   

const Testing=mongoose.model("testing",testingSchema)

module.exports=Testing