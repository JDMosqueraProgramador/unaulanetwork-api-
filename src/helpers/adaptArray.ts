import express from 'express';
import {Request, Response} from 'express'

export const fixArrays = (req:Request, res:Response, next:any) =>{
    let followingArray=[];
    let achievementArray=[]

    if(typeof req.body.achievement == 'string' && req.body.achievement != ""){
        achievementArray.push(req.body.achievement);
        req.body.achievement = achievementArray;
    }    

    next();
}