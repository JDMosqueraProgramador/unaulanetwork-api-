import path  from "path";
import { Request, Response } from "express";
import User from "../models/users.models";

require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

export const setUsers = async (req: Request, res: Response) => {
    
    const {
        username,
        dayOfBirth,
        work,
        description,
        achievement,
        compotences,
    } = req.body;

    const userDb = await User.findOne({ username });

    if (userDb) {
        return res.status(400).json({
            error: "El usuario ya existe",
        });
    }


    if (req.file) {

        const { path } = req.file;

        const { secure_url } = await cloudinary.uploader.upload(path);

        const profilePicture = secure_url;

        const user = new User({
            username,
            dayOfBirth,
            work,
            achievement,
            description,
            compotences,
            profilePicture,
        });

         await user.save();

         return res.status(200).json({ user });
    

    } else {

        const user = new User({
             
             username,
             dayOfBirth,
             work,
            achievement,
             compotences,
             description
             
         });
        
        await user.save();

        return res.status(200).json({ user });
    }

};

export const getOneUser = async (req: Request, res: Response) => {

    const userParam = req.params.user;

    await User.findOne({ username : userParam }, (err: any, user: any) => {
        if (err) return res.status(500).json({ error: err });

        if (user) return res.status(200).json(user);

        return res.status(404).json({ error: "Usuario no encontrado" });
    });
};
