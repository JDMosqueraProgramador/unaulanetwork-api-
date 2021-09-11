import { Request, Response } from "express";
import User from "../models/users.models";
import Competences from "../models/competences.models";
import { uploadImage } from '../helpers/uploadFile';
import { checkEmail } from "../helpers/validateUser";
import Competence from "../models/competences.models";



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
        competences,
    } = req.body;


    const userName = checkEmail(username);


    const userDb = await User.findOne({ userName });

    if (userDb) {
        return res.status(400).json({
            error: "El usuario ya existe",
        });
    }


    if (req.file) {

        const { path } = req.file;

        const { secure_url } = await cloudinary.uploader.upload(path, { folder: "profile" });

        const profilePicture = secure_url;

        const user = new User({
            username: userName,
            dayOfBirth,
            work,
            achievement,
            description,
            competences,
            profilePicture,
        });


        await user.save();

        return res.status(200).json({ user });


    } else {

        const user = new User({
            username: userName,
            dayOfBirth,
            work,
            achievement,
            competences,
            description,
        });

        await user.save();

        return res.status(200).json({ user });
    }

};

export const getOneUser = async (req: Request, res: Response) => {

const userParam = req.params.user;

    await User.findOne({ username: userParam }, (err: any, user: any) => {


            Competences.populate(user, { path: "competences", select: ' name' }, (err, user) => {


            if (err) return res.status(500).json({ error: err });

            if (user) {

                return res.status(200).json(user)
            
            } else {

                return res.status(404).json({ error: "Usuario no encontrado" }); 
            } 

         });

    });

};


export const updateUser = async (req: Request, res: Response) => {


    let data;

    const { username, model } = req.params;

    const { ...rest } = req.body;

    if (req.file) {

        uploadImage("users", username);

        const { path } = req.file;

        const { secure_url } = await cloudinary.uploader.upload(path);

        const profilePicture = secure_url;

        data = {
            profilePicture,
            rest,
        }
    } else {

        data = rest;
    }


    await User.findOneAndUpdate({ username }, data, { new: true }, (err: any, user: any) => {

        if (err) return res.status(500).json({ error: err });

        if (user) return res.status(200).json(user);

    });

}