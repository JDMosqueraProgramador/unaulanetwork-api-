import mongoose from "mongoose";
const { body, checkSchema, validationResult } = require("express-validator");
import User from "../models/users.models";
import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import express from 'express';
import { checkEmail } from "../helpers/validateUser";

const userSchemaValidator = checkSchema({
    username: {
        custom: {
            options: async (value: any) => {
                try {
                    const user = await User.findOne({ username: value });

                    if (user != null) {
                        //console.log("Acá se verificó que NO se creó")
                        throw new Error("Este username está ocupado");
                    }
                } catch {
                    throw new Error(
                        "No has enviado correctamente el nombre de usuario"
                    );
                }
            },
        },
    },
    description: {
        custom: {
            options: async (value: any) => {
                if (value != null || value != undefined) {
                    if (value.length < 12) {
                        throw new Error("Descripción demasiado corta");
                    } else if (value.length > 100) {
                        throw new Error("Descripción demasiado larga");
                    }
                }
            },
        },
    },
});

export const userExist = async (req: Request, res: Response, next: NextFunction) => {

    const user = checkEmail(req.body.username);

    const usuario = await User.findOne({ username: user })
    if (!usuario) {
        res.status(400).json({error:'Usuario '})
    }

}

export default userSchemaValidator;
