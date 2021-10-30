import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El username es obligatorio"],
        unique: true
    },
    profilePicture: {
        type: String,
        required: false,
    },
    check: {
        type: Boolean,
        required: true,
        default: false,
    },
    work: {

        type: String,
        name: String,
        default: "Unemployed",
    },
    description: {

        type: String,
        required: [true, "La descripcion es obligatoria"],
        default: "I am a student",
    },

    achievement: [
        {
            type: Object,
            name: {
                type: String,
                unique: true,
                required: 'Name is required',
            },
            date: {
                type: Date,
                unique: true,
                required: 'Date is required',
            },
            description: {
                type: String,
                required: 'Description is required',
            },
        },
    ],
    competences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competences"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

export default User;
