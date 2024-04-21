import { body, validationResult } from "express-validator";

export const validateQuiz = [
  body("question").notEmpty(),
  body("options").isArray().notEmpty(),
  body("rightAnswer").isInt(),
  body("startDate").isISO8601(),
  body("endDate").isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
