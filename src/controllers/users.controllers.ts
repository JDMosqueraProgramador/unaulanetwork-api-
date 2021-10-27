import { DataUpdateUser } from "./../interfaces/interface";
import { Request, Response } from "express";
import User from "../models/users.models";
import Competences from "../models/competences.models";
import { uploadImage } from "../helpers/uploadFile";
import { checkEmail } from "../helpers/validateUser";
import { existCompetenceByName } from '../helpers/competenceValidation';
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

    if (!data.achievement == null || !data.achievement == undefined) {
        
        let filterAchivement = data.achievement.filter((a: any) => a != "");

        data.achievement = filterAchivement;
    }

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

    console.log(data);
    const user = new User(data);

    await user.save((err: any, user: any) => {
        if (err)
            res.status(500).send({
                message: `Error al guardar el usuario `,
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

    let data : DataUpdateUser = {};

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


export const createOneAchievement = async (req: Request, res: Response) => {
    
    const { username } = req.params;

    const { name, date, description } = req.body;

    const existAchievement = await User.findOne({ username, "achievement.name" : name,"achievement.date" : date });;

    if (existAchievement) {
        
        return res.status(400).json({ errror: "Ya existe el logro" })
        
    }

    const data = { name, date, description };

    await User.findOneAndUpdate({ username },

        { $addToSet: { "achievement": data }} ,{new : false,strict: false,useFindAndModify : false} , (err: any, doc: any) => {

            if(err) return res.status(400).json({ error: "Error al agregar el logro" });
            
            if (doc) return res.status(200).json({ Message: "Logro agreagado correctamente" });
        
        })

}

export const deleteOneAchievement = async (req: Request, res: Response) => {
    
    const { username } = req.params;

    const { name, date } = req.body;

    const existAchievement = await User.findOne({ username, "achievement.name": name, "achievement.date": date });;

    if (existAchievement == null) {
        
        return res.status(400).json({ errror: "No se encontro el logro" })
        
    }

    await User.updateOne({ username }, { $pull: { achievement: { name: name, date: date } } }, {multi : true}, (err: any, doc: any) => {

            if(err) return res.status(400).json({ error: "Error al eliminar el logro" });
            
        if (doc) return res.status(200).json({ Message: "Logro eliminado correctamente" });
        
    })

}

export const updateOneAchievement = async (req: Request, res: Response) => {    










}

export const deleteCompetenceFromProfile = async (req: Request, res: Response) => {
    console.log(req.params);
    let username = req.params.username;
    let competenceId = req.body.competenceId;

   await User.findOne({ username }, (error: any, user: any) => {
        let originalCompetences = user.competences;
        let updatedCompetences = originalCompetences.filter((comp: any) => {
            if (comp != competenceId) {
                return comp;
            }
        });

        let data: any = {};
        data.competences = updatedCompetences;

        if (originalCompetences.length == updatedCompetences.length) {
            return res
                .status(400)
                .json({
                    error: "No tienes esta competencia o se ha introducido un ID diferente",
                });
        }

        User.findOneAndUpdate(
            { username },
            data,
            { new: true, useFindAndModify: false },
            (err: any, user: any) => {
                if (err) return res.status(500).json({ error: err });

                if (user) return res.status(200).json(user);

                if (!user) return res.status(400).json({ error: err });
            }
        );
    });
};
export const addCompetencesProfile = async (req: Request, res: Response) => {
    
    let username = req.params.username;
    let competenceId = req.body.competenceId;

    
    await User.findOne({ username }, (error: any, user: any) => {
        let data: any = {};
        let originalCompetences = user.competences;

        if (originalCompetences.includes(competenceId)) {
            return res.status(400).json({
                error: "Ya tienes esta competencia: " + competenceId,
            });
        }

        originalCompetences.push(competenceId);
        data.competences = originalCompetences;
        console.log(originalCompetences);


        User.findOneAndUpdate(
            { username },
            data,
            { new: true, useFindAndModify: false },
            (err: any, user: any) => {
                if (err) return res.status(500).json({ error: err });

                if (user) return res.status(200).json(user);

                if (!user) return res.status(400).json({ error: err });
            }
        );
    });
};
