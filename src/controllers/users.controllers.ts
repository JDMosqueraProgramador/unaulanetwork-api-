import { response } from 'express';
import { DataUpdateUser,IUser } from "./../interfaces/interface";
import { Request, Response } from 'express';
import User from "../models/users.models";
import Competences from "../models/competences.models";
import { uploadImage } from "../helpers/uploadFile";
import { checkEmail, existUserById } from "../helpers/validateUser";
import { existCompetenceByName } from '../helpers/competenceValidation';
import Competence from '../models/competences.models';
import { unaulaApi } from '../services/summoner';
import Message from '../models/messages.models';
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

export const login = async (req: Request, res: Response) => {
    const { user, password } = req.body;

    const body = {
        user,
        password,
    };

    await unaulaApi
        .post("auth/login", body, {
            headers: { "Content-Type": "application/json" },
        })
        .then(async (response: any) => {
            if (response.status == 200) {
                let status = response.status;

                await existUserById(user).catch((error) => {
                    status = 204;
                });

                return res
                    .status(status)
                    .header("Access-Control-Expose-Headers", "auth-token")
                    .header(
                        "Access-Control-Allow-Headers",
                        "auth-token, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header"
                    )
                    .header("auth-token", response.headers["auth-token"])
                    .json(response.data.message);
            }
        })
        .catch(function (error: any) {
            return res
                .status(error.response.status)
                .json(error.response.data.message);
        });
};

export const setUsers = async (req: Request, res: Response) => {
    const { ...data } = req.body;
    

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

    let data: IUser = {} ;

    await unaulaApi.get(`users/studentinfo/?userName=${userParam}`).then((response) => {
    
        data.name = response.data[0].strName;
        data.rol = response.data[0].rol;
        data.faculty = response.data[0].strfacultyname;
        data.deparment = response.data[0].strDepartmentName;

    }).catch((error) => {
        console.log( error);
    })

    await User.findOne({ username: userParam }, (err: any, user: any) => {
        Competences.populate(
            user,
            { path: "competences", select: { name: 1, description: 1 } },
            (err, user) => {
                //console.log(user);
                if (err) return res.status(500).json({ error: err });

                if (user) {

                    data = {...data, ...user._doc };

                    return res.status(200).json(data);
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

    const existAchievement = await User.findOne({
        username,
        "achievement.name": name,
        "achievement.date": date,
    });

    if (existAchievement) {
        return res.status(400).json({ errror: "Ya existe el logro" });
    }

    const data = { name, date, description };

    await User.findOneAndUpdate(
        { username },

        { $addToSet: { achievement: data } },
        { new: false, strict: false, useFindAndModify: false },
        (err: any, doc: any) => {
            if (err)
                return res
                    .status(400)
                    .json({ error: "Error al agregar el logro" });

            if (doc)
                return res
                    .status(200)
                    .json({ Message: "Logro agreagado correctamente" });
        }
    );
};

export const deleteOneAchievement = async (req: Request, res: Response) => {
    const { username } = req.params;

    const { name, date } = req.body;

    const existAchievement = await User.findOne({
        username,
        "achievement.name": name,
        "achievement.date": date,
    });

    if (existAchievement == null) {
        return res.status(400).json({ errror: "No se encontro el logro" });
    }

    await User.updateOne(
        { username },
        { $pull: { achievement: { name: name, date: date } } },
        { multi: true },
        (err: any, doc: any) => {
            if (err)
                return res
                    .status(400)
                    .json({ error: "Error al eliminar el logro" });

            if (doc)
                return res
                    .status(200)
                    .json({ Message: "Logro eliminado correctamente" });
        }
    );
};

export const updateOneAchievement = async (req: Request, res: Response) => {};


export const updateCompetencesProfile = async (req: Request, res: Response) => {
    let username = req.params.username;
    let competences = req.body.competences;

    await User.findOne({ username }, (error: any, user: any) => {
        let data: any = {};
        let originalCompetences = user.competences;

        if (Array.isArray(competences)) {
            if (competences.length == 0) {
                return res
                    .status(400)
                    .json({ message: "El arreglo está vacío" });
            }

            let uniqueCompetences = Array.from(new Set(competences));

            let newCompetences = uniqueCompetences.filter((e) => {
                if (e == "" || e == "") {
                    return false;
                }
                return (
                    e !== null ||
                    e.length > 3 ||
                    e.length !== 0 ||
                    e !== "" ||
                    e !== ""
                );
            });

            //console.log(newCompetences)
            User.findOne({ username }, (error: any, user: any) => {
                let data: any = {};
                data.competences = newCompetences;

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
        } else {
            return res.status(400).json({
                message:
                    "No has enviado correctamente las competencias en el tipo de dato correcto)",
            });
        }
    });
};
