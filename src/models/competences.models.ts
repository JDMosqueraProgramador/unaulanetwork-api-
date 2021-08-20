import mongoose from 'mongoose';


const competenceSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:false
    },
    area:{
        type:String,
        enum : ['informatica','derecho','contaduria','industrial','idiomas','educacion',''],
        required: true,
        default: ''
    }
})

const Competence=mongoose.model("Competences",competenceSchema);

export default Competence;