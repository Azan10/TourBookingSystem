const AppError = require('../AppError')
const Tour = require('../Models/Tour')
const ApiFeatures= require("../ApiFeatures")

//All these things need to be performed by Admin
exports.createTour=async(req,res,next)=>
{
    try{
    const tour=await Tour.create(req.body)
    res.status(200).json({
        status:"success",
        data:tour
    })}catch(error)
    {

        next(error)
    }

}


exports.getallTours=async(req,res,next)=>
{
try{
 let query=""
 
  if(req.query.tourName)
  {
    const tourNameRegex = new RegExp('^' + req.query.tourName, 'i');
    query=Tour.find({Name : tourNameRegex});
   
  }
  else{
    query=Tour.find()
  }

  const features= new ApiFeatures(query,req.query)
  .sort()
  .field()
  const Tours=await features.query


  res.status(200).json({
    status:"success",
    length:Tours.length,
    data:Tours
  })
}catch(error)
{
    next(error)
}
  
}

exports.getTourbyId = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.params.id)
            
        console.log(tour);
        if (!tour) {
            throw new AppError("no such tour exist", 404);
        }
        res.status(201).json({
            status: "sucess",
            data: tour
        });

    } catch (error) {
        next(error);
    }
};


exports.updateTour=async(req,res,next)=>
{
   try{

    const updatedTour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    console.log(updatedTour)
    if(!updatedTour)
    {
        throw new AppError("cant find that id",404)
    }
    res.status(200).json({
        status:"success",
        data:updatedTour

    })
    
   }catch(error)
   {
    next(error)
   }
}


exports.deleteTour=async(req,res,next)=>
{
  try{
    const deletedTour=await Tour.findByIdAndRemove(req.params.id)
    if(!deletedTour)
    {
        throw new AppError("no such id exist",404)
    }
    res.status(500).json({
        message:"success",
      
    })
    
  }catch(error)
  {
     next(error)
  }
}