const mongoose = require('mongoose');

const proyectSchema =new mongoose.Schema({
    name: String
});

const Proyect = mongoose.model('proyect', proyectSchema);

export default Proyect;