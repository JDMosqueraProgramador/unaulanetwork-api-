import { uploadFiles, storage } from './../helpers/uploadFile';
import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import { getOneUser, setUsers } from "../controllers/users.controllers";
import { validationUser } from '../middlewares/validateUser';
import { validateFields } from '../middlewares/validateData';

const Router = express.Router();

const upload = multer({ storage });


Router.get("/:user", getOneUser);

Router.post("/", [validationUser,
    validateFields,
    upload.single("profilePicture")], setUsers);


    
export default Router;
