import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true,
    },

    dayOfBirth: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"],
    },
    profilePhoto: {
        type: String,
        // required: false,
        required: false,
    },
    check: {
        type: Boolean,
        required: true,
        default: false,
    },

    faculty: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: false,
        default: "jobless",
    },
    description: {
        type: String,
        required: true,
        default: "I am a student ",
    },
    achievement: [
        {
            type: Object,
            require: false,

            name: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    competences: [
        {
            type: Object,
            require: false,

            name: {
                type: String,
                required: true,
            },
        },
    ],
});

const User = mongoose.model("User", UserSchema);

export default User;
