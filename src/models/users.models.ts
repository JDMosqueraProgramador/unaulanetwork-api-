import mongoose from "mongoose";
import Competence from './competences.models';


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
    profilePicture: {
        type: String,
        required: false,
    },
    check: {
        type: Boolean,
        required: true,
        default: true,
    },
    work: {
        type: String,
        name: String,
        required: true,
        defauld : "Unemployed"
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
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competences",
        },
    ],
});

const User = mongoose.model("User", UserSchema);

export default User;
