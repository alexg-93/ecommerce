

const customError = (err,req,res,next) =>{
  const statusCode = res.stausCode === 200 ? 500 : res.statusCode
  console.log("Error -->" , err.message)
 
  res.status(statusCode).json({
      message: err.message,
      statusCode: statusCode,
      stackTrace : process.env.NODE_ENV === 'production' ? null : err.stack
  })
  next();
}

export default customError;