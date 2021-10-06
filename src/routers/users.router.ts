import { uploadFiles } from './../helpers/uploadFile';
import express from "express";

import { check } from "express-validator";

import {
    getOneUser,
    setUsers,
    updateUser

} from "../controllers/users.controllers";
import { validationUser, existUserById, validateDate } from '../helpers/validateUser';
import { validateInfo } from "../middlewares/validateData";
import { upload } from "../helpers/multer";
import userSchemaValidator from "../middlewares/usersValidate"

import { tokenValidation } from  "../middlewares/validateToken"


const Router = express.Router();

Router.get("/:user", tokenValidation , getOneUser);

Router.post(
    "/",
    [
        userSchemaValidator,
        upload.single("profilePicture"),
        check("username").custom(validationUser),
        validateInfo
        
    ],
    setUsers
);

Router.put(
    "/:username",
    [
        upload.single("profilePicture"),
        check("username").custom(existUserById),
        validateInfo,

    ],
    updateUser
);



export default Router;
