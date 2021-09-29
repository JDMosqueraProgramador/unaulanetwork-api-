import  mongoose  from "mongoose";

const followerSchema = new mongoose.Schema({

    following: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"

    },
    follower: {

        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
        
});

const Follower = mongoose.model("Follower", followerSchema);

export default Follower;