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
import {fixArrays} from "../helpers/adaptArray"
import { tokenValidation } from  "../middlewares/validateToken"

import { follow, unfollow} from "../controllers/follow.controllers";

const Router = express.Router();

Router.get("/:user", tokenValidation , getOneUser);

Router.post(
    "/",
    [
        
       
        upload.single("profilePicture"),
        check("username").custom(validationUser),
        fixArrays,
        userSchemaValidator,
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
