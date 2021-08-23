import { uploadFiles } from './../helpers/uploadFile';
import express from "express";
import { getOneUser, setUsers } from "../controllers/users.controllers";
import { validationUser } from '../middlewares/validateUser';
import { validateFields } from '../middlewares/validateData';
import { upload } from "../helpers/multer";

const Router = express.Router();

Router.get("/:user", getOneUser);

Router.post("/", [validationUser,
    validateFields,
    upload.single("profilePicture")], setUsers);

export default Router;
