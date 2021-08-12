import mongoose from "mongoose";
import User from "./users.models";

const followerSchema = new mongoose.Schema({

    following: {
        type: User,
        required: true
    },

    follower: {
        type: User,
        required: true
    }
    
})

const Follower = mongoose.model("Follower", followerSchema);

export default Follower;