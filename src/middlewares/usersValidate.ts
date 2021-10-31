import mongoose from "mongoose";
const { body, checkSchema, validationResult } = require("express-validator");
import User from "../models/users.models";
import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import express from "express";
import { checkEmail } from "../helpers/validateUser";
import Message from "../models/messages.models";

const userSchemaValidator = [
    checkSchema({
        username: {
            custom: {
                options: async (value: any) => {
                    const user = await User.findOne({ username: value });

                    if (user != null) {
                        throw new Error("Este username está ocupado");
                    }
                    if (value.length <= 5) {
                        throw new Error(
                            "Este username tiene una longitud muy corta. Debe tener mínimo 6 caracteres"
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
        work: {
            custom: {
                options: async (value: any) => {
                    if (value == "") {
                        throw new Error("¡El campo de trabajo está vacío!");
                    }
                },
            },
        },
        achievement: {
            custom: {
                options: async (value: any) => {
                    if (!Array.isArray(value)) {
                        throw new Error(
                            "Los logros no se entregaron en forma de arreglo"
                        );
                    }
                },
            },
        },
        competences: {
            custom: {
                options: async (value: any) => {
                    if (!Array.isArray(value)) {
                        throw new Error(
                            "Las competencias no se entregaron en forma de arreglo"
                        );
                    }
                },
            },
        },
    }),

    (req: Request, res: Response, next: NextFunction) => {
        if (validationResult(req).errors.length > 0) {
            res.status(400).json(validationResult(req).errors);
        } else {
            next();
        }
    },
];

export const userExist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = checkEmail(req.body.username);

    const usuario = await User.findOne({ username: user });
    if (!usuario) {
        res.status(400).json({ error: "Usuario existente" });
    }
};

export default userSchemaValidator;
