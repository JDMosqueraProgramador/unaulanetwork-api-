import mongoose from "mongoose";
import Group from "./groups.models";
import User from "./users.models";

const publiactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    media:[{
        type: String,
        required:false
    }],
    category: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
        enum:['public', 'private']
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    reactions: {
        type: Number,
        required: true,
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
}, {timestamps:true});

const Publication = mongoose.model("Publication", publiactionSchema);

export default Publication;