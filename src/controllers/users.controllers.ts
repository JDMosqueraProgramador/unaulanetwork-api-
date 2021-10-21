import { DataUpdateUser } from "./../interfaces/interface";
import { Request, Response } from "express";
import User from "../models/users.models";
import Competences from "../models/competences.models";
import { uploadImage } from "../helpers/uploadFile";
import { checkEmail } from "../helpers/validateUser";
import Competence from '../models/competences.models';

require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

export const setUsers = async (req: Request, res: Response) => {
    const { ...data } = req.body;

    //console.log(req.headers);

  
    const username = checkEmail(data.username);

    //console.log(username)
    data.username = username;

  

    if (req.file) {
        const { path } = req.file;
        const { secure_url } = await cloudinary.uploader.upload(path, {
            folder: "profile",
        });

        const profilePicture = secure_url;

        data.profilePicture = profilePicture;
    } else {
        data.profilePicture = process.env.profilePictureDeafult;
    }

    console.log(data)
    const user = new User(data);

    await user.save((err: any, user: any) => {
        if (err)
            res.status(500).send({
                message: `Error al guardar el usuario ${err}`,
            });

        res.status(200).json(user);
    });
};

export const getOneUser = async (req: Request, res: Response) => {
    const userParam = req.params.user;
    //console.log(req.headers)

    await User.findOne({ username: userParam }, (err: any, user: any) => {
        Competences.populate(
            user,
            { path: "competences", select: { name: 1, description: 1 } },
            (err, user) => {
                //console.log(user);
                if (err) return res.status(500).json({ error: err });

                if (user) {
                    return res.status(200).json(user);
                } else {
                    return res
                        .status(404)
                        .json({ error: "Usuario no encontrado" });
                }
            }
        );
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    const { work, description } = req.body;

    let data: DataUpdateUser = {};

    if (work !== undefined) data.work = work;

    if (description !== undefined) data.description = description;

    if (req.file) {
        uploadImage("users", username);

        const { path } = req.file;

        const { secure_url } = await cloudinary.uploader.upload(path, {
            folder: "profile",
        });

        const profilePicture = secure_url;

        data.profilePicture = profilePicture;
    }

    //console.log(data);

    await User.findOneAndUpdate(
        { username },
        data,
        { new: true },
        (err: any, user: any) => {
            if (err) return res.status(500).json({ error: err });

            if (user) return res.status(200).json(user);

            if (!user) return res.status(400).json({ error: err });
        }
    );
};
export const deleteCompetenceFromProfile = async (req:Request, res:Response) =>{ 

    console.log(req.params)
    let username = req.params.username;
    let competenceId = req.params.competenceId;

    User.findOne({username}, (error:any, user:any) =>{
        
         let originalCompetences = user.competences;
         let updatedCompetences = originalCompetences.filter((comp:any) =>{if(comp!=competenceId){return comp}})

         let data:any = {}        
         data.competences = updatedCompetences;

         if(originalCompetences.length == updatedCompetences.length){
             return res.status(400).json({ error: "No tienes esta competencia o se ha introducido un ID diferente" });
         }

         
        User.findOneAndUpdate({username}, data,  { new: true, useFindAndModify: false}, (err: any, user: any) =>{
             
            
            
            if (err) return res.status(500).json({ error: err });


             if (user) return res.status(200).json(user);

             if (!user) return res.status(400).json({ error: err });
        })
        //console.log(originalCompetences)
        //console.log(updatedCompetences)

    })
}
