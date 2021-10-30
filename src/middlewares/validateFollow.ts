const { body, checkSchema, validationResult } = require("express-validator");
import e, { NextFunction, Request, Response, request, response } from "express";
import { follow } from '../controllers/follow.controllers';
import { isValidObjectId, mongo } from "mongoose";

const followSchemaValidator = [
    checkSchema({
        id: {
            in: ["params", "query"],
            custom: {
                options: async (value: any) => {
                    
                    if (!isValidObjectId(value) || value.length <= 3) {
                        throw new Error("El ID del seguidor NO es válida");
                    }
                },
            },
        },
        userFollow: {
            in: ["params", "query"],
            custom: {
                options: async (value: any) => {
                    if (!isValidObjectId(value) || value.length <= 3) {
                        throw new Error("El ID del seguidor NO es válida");
                    }
                },
            },
        },
    }),
    (req: Request, res: Response, next: any) => {
        if (validationResult(req).errors.length > 0) {
            res.status(400).json(validationResult(req).errors);
        } else {
            req.body = {};
            next();
        }
    },
];

export default followSchemaValidator;