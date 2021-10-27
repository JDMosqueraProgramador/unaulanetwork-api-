import { Request, Response } from "express";

import User from "../models/users.models";

import Follower from '../models/followers.models';


export const follow =  async(req: Request, res: Response) => {
    
    const { id, userFollow } = req.params;


    const data = {

        following : userFollow  ,
        follower: id
    
    };

    const follow = new Follower(data);

    await follow.save((err: any, user: any) => {

        if (err)
            res.status(500).send({
                message: `Error al seguir al usuario ${err}`,
            });

        res.status(200).json({messague:"Se siguio al usuario"});
    
    });

}


export const unfollow = async (req: Request, res: Response) => {

    const { id, userFollow } = req.params;
    
    await Follower.deleteOne({ following: userFollow, follower: id });
    
    return res.status(200).json({message:"Ha dejado de seguir al usuario"});

}

export const followers = async (req: Request, res: Response) => {
    const users = await User.find();

    console.log(users);
};