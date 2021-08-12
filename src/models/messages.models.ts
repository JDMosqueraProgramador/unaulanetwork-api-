import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    transmitter: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
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