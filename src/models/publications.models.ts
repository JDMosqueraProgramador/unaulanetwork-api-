import mongoose from "mongoose";
import Group from "./groups.models";
import User from "./users.models";

const publiactionSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    group: {
        type: Group,
        required: false,
    },
    photo: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    comments: [
        {
            user: {
                type: User,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
    ],
});

const Publication = mongoose.model("Publication", publiactionSchema);

export default Publication;