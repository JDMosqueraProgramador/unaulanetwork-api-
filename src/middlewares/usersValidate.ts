import mongoose from "mongoose";
const { body, checkSchema, validationResult } = require("express-validator");
import User from "../models/users.models";
import { Request, Response } from "express";
import { validate } from "uuid";

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

export default userSchemaValidator;
