import { updateUser } from './../controllers/users.controllers';
import express from "express";
import { upload } from '../helpers/multer';
import {addnewProyect, updateOneProyect,deleteOneProyect} from "../controllers/proyects.controllers" ;


const Router = express.Router();

Router.post("/proyectAdd/:username",[upload.none()] ,addnewProyect);
Router.put("/proyectUpdate/:id", [upload.none()], updateOneProyect);
Router.delete("/deleteProyect/:id", [upload.none()], deleteOneProyect);

export default Router;
