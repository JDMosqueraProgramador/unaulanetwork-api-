import mongoose from "mongoose";

const groupSchema =new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    visibility: {
        type: String,
        required: true,
    },
    check: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    admin: [],
    members: [],
    publications: [],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;