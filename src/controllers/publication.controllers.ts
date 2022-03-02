import Publication from "../models/publications.models";
import { Request, Response } from "express";


export const createPublication = async(req:Request, res:Response) =>{
    
    console.log(req.body)
    
    const {id, desc, visibility} = req.body;


     const data = {
         user: req.body.id,
         description: req.body.description,
         visibility: req.body.visibility
    }

    res.status(200).json({message:"Bien xd"})
}