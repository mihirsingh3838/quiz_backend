import Quiz from "../model/quizModel.js";


const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActiveQuiz = async (req, res) => {
  try {
    const now = new Date();
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: "No active quiz found" });
    }

    res.status(200).json({ quiz: activeQuiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuizResult = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const now = new Date();
    const fiveMinutesAfterEnd = new Date(quiz.endDate);
    fiveMinutesAfterEnd.setMinutes(fiveMinutesAfterEnd.getMinutes() + 5);

    if (now < fiveMinutesAfterEnd) {
      return res
        .status(403)
        .json({ message: "Quiz result is not available yet" });
    }

    res.status(200).json({ correctAnswer: quiz.options[quiz.rightAnswer] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes };
