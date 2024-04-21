// Define a utility function for handling asynchronous errors
const asyncHandler = (fn) => {
  // Create a wrapper function that calls the provided function and catches any errors
  return (req, res, next) => {
    // Call the provided function with the request, response, and next middleware function as arguments
    fn(req, res, next).catch((err) => {
      // If an error is caught, call the next middleware function with the error as the argument
      next(err);
    });
  };
};

// Export the asyncHandler utility function
export default asyncHandler;