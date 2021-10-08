import express from 'express';
import {Request, Response} from 'express'

export const fixArrays = (req:Request, res:Response, next:any) =>{

    console.log(req.body)

    let followingArray=[];
    let achievementArray=[]

    if(typeof req.body.achievement == 'string'){
        achievementArray.push(req.body.achievement);
        req.body.achievement = achievementArray;
    }
    
    if (typeof req.body.following == "string") {
        followingArray.push(req.body.following)
        req.body.following = followingArray;
    }
    next();
}