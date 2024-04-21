import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  rightAnswer: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
});

quizSchema.pre('save', async function (next) {
  const currentDate = new Date();
  if (this.startDate <= currentDate && currentDate < this.endDate) {
    this.status = 'active';
  }
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
