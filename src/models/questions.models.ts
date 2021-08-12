import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    hastag: [{}],
    score: {
        type: Number,
        required: true,
    },
    answers: [
        {
            user: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
    ],
});

const Question = mongoose.model("Question", questionSchema);

export default Question;