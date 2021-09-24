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

    const { ...data } = req.body;
    
    const username = checkEmail(data.username);

    data.username = username;

    if (req.file) {

        const { path } = req.file;

        const { secure_url } = await cloudinary.uploader.upload(path, { folder: "profile" });

        const profilePicture = secure_url;

        data.profilePicture = profilePicture;
    }
    else {
        
        data.profilePicture = process.env.profilePictureDeafult;
    }
    
    const user = new User(data);

    await user.save((err : any, user : any) => {
        
        if (err) res.status(500).send({ message: `Error al guardar el usuario ${err}` });

        res.status(200).json(user);

    });

}

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

        if(!user) return res.status(400).json({error:err})

    });

}


export const follow =  async(req: Request, res: Response) => {
    
    const username = String(req.params.username);
    const followerUser = await User.findOne({username:username})
    
    const {following} = req.body;
   

     const user = await User.findOne({username:username},(err: any, user: any) =>{

        
            following.map((e:any) =>{
            user.following.push(e)
            const followed = User.findById(e, (err: any, followed: any) =>{
               
                followed.followers.push(followerUser._id)
                followed.save();
                
            })
        })
         user.save();

         return res.status(200).json(user)
    })


}

export const followers = async(req:Request, res: Response) =>{
    const users = await User.find();
    console.log(users)


}