import  mongoose  from "mongoose";

const followerSchema = new mongoose.Schema({
    following:[{

    }],
    follower:[{

    }]
})

const Follower = mongoose.model("Follower", followerSchema);

export default Follower;