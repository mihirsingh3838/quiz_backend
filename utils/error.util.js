// Define a custom error class that extends the built-in Error class
class AppError extends Error {
  // Constructor that takes a message and a status code
  constructor(message, statusCode) {
    // Call the superclass constructor with the message
    super(message);

    // Set the status code property
    this.statusCode = statusCode;

    // Capture the stack trace for this error instance
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the custom error class
export default AppError;