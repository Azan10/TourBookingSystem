const User=require('../Models/User')
const util=require('util')
const promisify = util.promisify;
const jwt=require('jsonwebtoken')
const AppError=require('../AppError');


const signToken = (id, res) => {  // Notice the added `res` parameter here
  const token = jwt.sign({id}, process.env.jwt_secret, {
      expiresIn: process.env.jwt_expiresIn
  });
  
  res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false
  });
  
  return token;
}

exports.signUp = async (req, res, next) => {
  try {
  
      const newUser = await User.create(req.body);
      if (!newUser) {
          throw new AppError("Cannot Create User", 501);
      }
      const token = signToken(newUser._id, res);  // Passing the `res` object here
      res.status(201).json({
          status: 'success',
          token: token,
          data: newUser
      });
  } catch (error) {
      next(error)
  }
};

exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;
  try {
      const searchedUser = await User.findOne({ Email }).select("+Password");
      if (!searchedUser || !(await searchedUser.comparePassword(Password, searchedUser.Password))) {
      
       throw new AppError("Incorrect login credentials", 501);
      } 
      const token = signToken(searchedUser._id, res);  // Passing the `res` object here
      res.status(200).json({
          status: 'Success',
          token: token,
          Fullname: searchedUser.Fullname,
          id: searchedUser._id
      });
  } catch (err) {
    
      next(err);
  }
};



exports.protect=async(req,res,next)=>
{
    try{
    
    let token=""
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
      token=req.headers.authorization.split(" ")[1]
    }
    if(!token)
    {
      
        console.log("no token exist")
        throw new AppError("Token is required",401)
    }

    const decoded=await promisify(jwt.verify)(token,process.env.jwt_secret)
    const freshuser=await User.findById(decoded.id)
    
     req.user=freshuser

     next()
    
    }catch(error)
     { 
        next(error)
     }

}

exports.restrictTo=(...permission)=>
{
  return (req,res,next)=>{
  {try{
   
     if(!permission.includes(req.user.Role)){
        throw new AppError("You donot have permission",401)
     }
    
    next()
      
  }catch(error)
  {
    next(error)
  }
}
  }
}

  




