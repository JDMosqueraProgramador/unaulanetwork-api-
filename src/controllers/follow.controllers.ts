import { Request, Response } from "express";
import User from "../models/users.models";
import Follower from "../models/followers.models";
import { isValidObjectId } from "mongoose";


export const follow = async (req: Request, res: Response) => {
    const { id, userFollow } = req.params;

    const data = {
        following: userFollow,
        follower: id,
    };

    const follow = new Follower(data);

    await follow.save((err: any, user: any) => {
        if (err)
            res.status(500).send({
                message: `Error al seguir al usuario ${err}`,
            });

        res.status(200).json({ messague: "Se siguio al usuario" });
    });
};

export const unfollow = async (req: Request, res: Response) => {
    const { id, userFollow } = req.params;

    await Follower.deleteOne({ following: userFollow, follower: id });

    return res.status(200).json({ message: "Ha dejado de seguir al usuario" });
};

export const myFollowings = async (req: Request, res: Response) => {
    if (req.params.id == null || req.params.id == undefined) {
        return res
            .status(400)
            .json({ message: "Has enviado incorrectamente el ID" });
    }

    let id = req.params.id;
    let Following: any = [];

    const result = await Follower.find({ follower: id });

    if (result.length == 0) {
        return res
            .status(200)
            .json({ message: "Este usuario no sigue a nadie actualmente." });
    }

    let count = 0;
    await result.map((e: any, i: any) => {
        User.findById(e.following, (error: any, data: any) => {
            if (data == null || data == undefined) {
                return false;
            }

            let dataFollowing = {
                id_following: e.following,
                username: data.username,
                profilePicture: data.profilePicture
            };
            Following.push(dataFollowing);

            if (i == result.length - 1 || (i == 0 && result.length == 0)) {
                return res.status(200).json(Following);
            }
        });
    });
};

export const myFollowers = async (req: Request, res: Response) => {
    if (req.params.id == null || req.params.id == undefined ) {
        return res
            .status(400)
            .json({ message: "Has enviado incorrectamente el ID" });
    }


    let id = req.params.id;
    let Followers: any = [];

   
    const result = await Follower.find({ following: id })

    if (result.length == 0) {
        return res
            .status(200)
            .json({ message: "Este usuario no tiene seguidores" });
    }

        await result.map((e: any, i: any) => {
        User.findById(e.follower, (error: any, data: any) => {

            

            if(data == null || data == undefined){
                return false;
            }
            let dataFollower = {
                id_following: e.follower,
                username: data.username,
                profilePicture: data.profilePicture,
            };
            Followers.push(dataFollower);

            if (i == result.length - 1 || (i == 0 && result.length == 0)) {
                return res.status(200).json(Followers);
            }
        });
    });
    
    
};
