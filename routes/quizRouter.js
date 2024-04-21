// Import the required modules
import express from "express";
import { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes } from "../controller/quizController.js";
import { validateQuiz } from "../middleware/validateQuiz.js";

// Set up a router for the quiz routes
const router = express.Router();

// Set up routes for creating a quiz, getting active quizzes, getting quiz results, and getting all quizzes
router.post("/quizzes",validateQuiz, createQuiz);
router.get('/quizzes/active', getActiveQuiz);
router.get('/quizzes/:id/result', getQuizResult);
router.get('/quizzes/all', getAllQuizzes);

// Export the router
export default router;