import mongoose from "mongoose";
import Group from "./groups.models";
import User from "./users.models";

const publiactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    publicationDate: {
        type: Date,
        require: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    reactions: {
        type: String,
        enum: ['like'],
        required: false,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
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
    hastags:[{
        type: String,
        required: false,
    }]
});

const Publication = mongoose.model("Publication", publiactionSchema);

export default Publication;