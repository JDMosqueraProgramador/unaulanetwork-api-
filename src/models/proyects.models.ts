import mongoose from 'mongoose';
import Group from "./groups.models";
import User from "./users.models";

const proyectSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name:{
        type:String,
        required: true
    },
    areas: [{
        type:String,
        enum : ['informatica','derecho','contaduria','industrial','idiomas','educacion',''],
        required: true,
        default: ''
    }],
    images : [{
        type:String,
        required: false,
    }],
    description : {
        type:String,
        required: true,
    },
    developers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }]
});

const Proyect = mongoose.model('proyect', proyectSchema);

export default Proyect;