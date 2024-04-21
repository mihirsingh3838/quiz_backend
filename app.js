// Import the required modules
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleWare from "./middleware/error.middleware.js";
import quizRoutes from "./routes/quizRouter.js";
import userRoutes from "./routes/userRouter.js";
import rateLimit from "express-rate-limit";

// Set up the Express application
const app = express();

// Set up a rate limiter to prevent excessive requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Use the rate limiter middleware
app.use(limiter);

// Set up CORS to allow requests from the frontend application
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
}));

// Use the JSON and URL-encoded parsers for request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the cookie parser middleware
app.use(cookieParser());

// Use the morgan middleware for logging requests
app.use(morgan("dev"));

// Set up a route to test the server
app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Set up routes for the quiz and user APIs
app.use("/api/v1", quizRoutes);
app.use("/api/v1/user", userRoutes);

// Set up a catch-all route for 404 errors
app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

// Use the error middleware to handle errors
app.use(errorMiddleWare);

// Export the Express application
export default app;