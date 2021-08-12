import { Request, Response } from "express";
import User from "../models/users.models";
 
export const setUsers = async (req: Request, res: Response) => {
    
    // const { name, firstName, lastName, dateOfBirth, work, description, profilePicture, phone, competences } = req.body;
    
    const {
        username,
        dayOfBirth,
        work,
        description,
        achievement,
        competences,
        name,
        lastName,
        lastName2,
    } = req.body;

    // const profilePhoto = req.files.profilePhoto;

    //const namePhoto = await loadProfilePhoto(req.files);

    const userDb = await User.findOne({ username });

    if (userDb) {
        return res.status(400).json({
            msg: "El usuario ya existe",
        });
    }

    const user = new User({
        username,
        dayOfBirth,
        work,
        achievement,
        description,
        competences,
        name,
        lastName,
        lastName2,
    });

    try {

        await user.save();

        return res.status(200).json(user);
    
    } catch (error) {
    
        return res.status(404).json(error);
    
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
