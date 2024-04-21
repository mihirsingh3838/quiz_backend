// Import the required modules
import express from "express";
import { register, login, logout, getProfile } from "../controller/userController.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

// Set up a router for the user routes
const router = express.Router();

// Set up routes for user registration, login, logout, and profile retrieval
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);

// Export the router
export default router;