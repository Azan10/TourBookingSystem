
const AppError = require("../AppError");
const User=require("../Models/User")
const multer = require('multer');
const MulterGoogleStorage = require('multer-google-storage');



const gcsStorage = MulterGoogleStorage.storageEngine({
  bucket: 'tourbooking',
  projectId: 'swift-arcadia-381216',
  keyFilename:"W:\\Tour Booking System\\backend\\Controller\\mykey.json",
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

exports.upload = multer({
  storage: gcsStorage,
  fileFilter: fileFilter
});


exports.getUser=async(req,res,next)=>
{
  try{
   
  
      const user=await User.findById(req.user._id)
      if(!user)
      {
        throw new AppError("User doesnt exist",401)
      }
      
      res.status(200).json({
        status:"success",
        data:user
      })

  }catch(error)
  {
      next(error)
  }
}



exports.updateUser = async (req, res, next) => {
    try {
     
        const updatedData = {};
       
        if (req.body.Fullname) {
            updatedData.Fullname = req.body.Fullname;
        }

        if (req.file && req.file.path) {
            updatedData.imageURL = req.file.path;
        }

        const user = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true }); // { new: true } returns the updated document

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        next(error);
    
    }
}



