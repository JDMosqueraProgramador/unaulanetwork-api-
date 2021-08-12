import mongoose from "mongoose";
import User from './users.models';

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    transmitter: {
        type: User,
        required: true,
    },
    receiver: {
        type: User,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    viewed: {
        type: Boolean,
        required: true,
    },
    file: {
        type: String,
        required: false,
    },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;