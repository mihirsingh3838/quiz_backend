// Define a custom error middleware function
const errorMiddleWare = (err, req, res, next) => {
  // Set the status code to 500 if it's not already set
  err.statusCode = err.statusCode || 500;
  // Set the error message to a default value if it's not already set
  err.message = err.message || "Something went wrong!";
  
  // Send a JSON response with the error details
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

// Export the custom error middleware function
export default errorMiddleWare;