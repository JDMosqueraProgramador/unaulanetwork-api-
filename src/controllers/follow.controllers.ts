import { Request, Response } from "express";
import User from "../models/users.models";
import Follower from "../models/followers.models";
import { unaulaApi } from "../services/summoner";
import { IUser } from "../interfaces/interface";

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

//**Método para ver los seguidos
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

    await result.map((e: any, i: any) => {
        let counter = 0;
        User.findById(e.following, (error: any, data: any) => {
            if (data == null || data == undefined) {
                return false;
            }

            unaulaApi
                .get(`users/studentinfo/?userName=${data.username}`)
                .then((response) => {
                    let dataFollowing = {
                        id_following: e.following,
                        name: response.data[counter].strName,
                        faculty: response.data[counter].strfacultyname,
                        username: data.username,
                        profilePicture: data.profilePicture,
                    };
                    Following.push(dataFollowing);

                    if (
                        i == result.length - 1 ||
                        (i == 0 && result.length == 0)
                    ) {
                        return res.status(200).json(Following);
                    }
                    if (
                        i == result.length - 1 ||
                        (i == 0 && result.length == 0)
                    ) {
                        return res.status(200).json(Following);
                    }
                    counter++;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    });
};

//**Método para ver los seguidores
export const myFollowers = async (req: Request, res: Response) => {
    let id = req.params.id;
    let Followers: any = [];

    const result = await Follower.find({ following: id });

    if (result.length == 0) {
        return res
            .status(200)
            .json({ message: "Este usuario no tiene seguidores" });
    }

    await result.map((e: any, i: any) => {
        User.findById(e.follower, (error: any, data: any) => {
            let counter = 0;
            if (data == null || data == undefined) {
                return false;
            }
            unaulaApi
                .get(`users/studentinfo/?userName=${data.username}`)
                .then((response) => {
                    let dataFollower = {
                        id_following: e.follower,
                        name: response.data[counter].strName,
                        faculty: response.data[counter].strfacultyname,
                        username: data.username,
                        profilePicture: data.profilePicture,
                    };

                    Followers.push(dataFollower);

                    if (
                        i == result.length - 1 ||
                        (i == 0 && result.length == 0)
                    ) {
                        return res.status(200).json(Followers);
                    }
                    counter++;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    });
};
