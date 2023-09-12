const AppError=require('./AppError')

exports.errorHandler=(error, req, res, next) => {
  if(error instanceof AppError) {
    console.log("route1")
    return res.status(error.statuscode).json({
      status:"error",
      message:error.message
    })
  }

  else if(error.name === "ValidationError"){
    if (error.message.includes("Passwords do not match")) {
        return res.status(400).json({
            status: "error",
            message: "Passwords do not match"
        });
    } 

    // If the error is a ValidationError but not the password mismatch
    return res.status(500).json({
        status: "error",
        message: error.message
    });
}


  else{
    console.log("route3")
    return res.status(400).json({
        status:"error",
        message:error.message
    })
  }
  
 
}



