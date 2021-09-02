import { uploadFiles } from './../helpers/uploadFile';
import express from "express";

import { check } from "express-validator";

import {
    getOneUser,
    setUsers,
    updateUser,
} from "../controllers/users.controllers";

import {
    validationUser,
    existUserById,
    validateDate,
} from "../helpers/validateUser";
import { validateInfo } from "../middlewares/validateData";
import { upload } from "../helpers/multer";

const Router = express.Router();

Router.get("/:user", getOneUser);

Router.post(
    "/",
    [
        upload.single("profilePicture"),
        check('username').custom(validationUser),
        check("dayOfBirth").custom(validateDate),
        validateInfo,
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
