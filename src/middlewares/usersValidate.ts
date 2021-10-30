import mongoose from "mongoose";
const { body, checkSchema, validationResult } = require("express-validator");
import User from "../models/users.models";
import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import express from 'express';
import { checkEmail } from "../helpers/validateUser";
import Message from '../models/messages.models';

const userSchemaValidator = checkSchema({
    username: {
        custom: {
            options: async (value: any) => {
                
                    const user = await User.findOne({ username: value });
                        
                        throw new Error("Este username está ocupado");
                    
                
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
        res.status(400).json({error:'Usuario existente'})
    }

}

export default userSchemaValidator;
