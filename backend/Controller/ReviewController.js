const AppError = require('../AppError')
const Review = require('../Models/Reviews')
const User=require('../Models/User')
const Tour=require("../Models/Tour")

//All these things need to be performed by User
exports.createReview=async(req,res,next)=>
{
    if(req.params.tourId){ //make it generic so it can be used in handler factory
     req.body.Tour=req.params.tourId
     req.body.User=req.user._id  //get user id from protect to middleware
   
    }
    try{
    
    const newReview=await Review.create(req.body)
     
  
    res.status(200).json({
        status:"success",
        data:newReview
    })}catch(error)
    { 
       
       next(error)
        
    }

}


exports.getallReviews=async(req,res,next)=>
{
try{
  const Reviews=await Review.find()
  res.status(200).json({
    status:"success",
    length:Reviews.length,
    data:Reviews
  })
}catch(error)
{
    next(error)
}
  
}

exports.getReviewsbyTourId=async(req,res,next)=>
{
  try{

    const tourId=req.params.tourId
    const Reviews=await Review.find({Tour:tourId})
    .populate({
      path: 'User',
      model: User,
      select: 'Fullname imageURL'
    });
    if(!Reviews)
    {
        throw new Error("This tour doesnt exist",501)
    }
    res.status(200).json({
        message:"success",
        data:Reviews

    })
    
  }catch(error)
  {
    next(error)
  }
   
}

exports.getReviewsbyUserId=async(req,res,next)=>
{
  try{

     const userId=req.user._id
    
     const Reviews = await Review.find({ User: userId })
      .populate({
        path: 'Tour',
        model: Tour,
        select: "Name"
      })
      .populate({
        path: 'User',
        model: User,
        select: 'Fullname'
      });
    
     if(!Reviews)
     {
        throw new AppError("This user doesnt exist",501)
     }

     res.status(201).json({
        status:"success",
        data:Reviews
     })


  }catch(error)
  {
    next(error)
  }
   
}



exports.updateReview=async(req,res,next)=>
{
   try{
    
    const updatedReview=await Review.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    
    if(!updatedReview)
    {
        throw new AppError("cant find that id",404)
    }
    res.status(200).json({
        status:"success",
        data:updatedReview

    })
    
   }catch(error)
   {
    next(error)
   }
}


exports.deleteReview=async(req,res,next)=>
{
  try{
    const deletedReview=await Review.findByIdAndRemove(req.params.id)
    if(!deletedReview)
    {
        throw new AppError("no such id exist",404)
    }
    res.status(200).json({
        message:"success",
      
    })
    
  }catch(error)
  {
     next(error)
  }
}