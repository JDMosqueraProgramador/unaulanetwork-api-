import { Request, Response } from "express";

import User from '../models/users.models';
import { uploadImage } from "../helpers/uploadFile";
import Proyect from "../models/proyects.models";


require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

//Proyectos

//Agregar

export const addnewProyect = async (req: Request, res: Response)=>{

    const { username } = req.params;

    const { name, link, areas, images, description,owner,group} = req.body;

    let data: any = {};

    if (name !== undefined) data.name = name;
    if (group !== undefined) data.group = group;
    if (owner !== undefined) data.owner = owner;
    if (link !== undefined) data.link = link;
    if (areas !== undefined) data.areas = areas;
    if (description !== undefined) data.description = description;


    console.log(req.body)

   await User.findOne({username}, (error:any, user:any)=>{

        //let data: any = {};

        const proyect = new Proyect(data)
        //data.proyects = proyects;

        console.log(proyect);

        proyect.save((err:any, user:any)=>{

            if (err) return res.status(500).json({ error: err });

                if (user) return res.status(200).json(user);

                if (!user) return res.status(400).json({ error: err });
        });

    });

};


//Editar

export const updateOneProyect = async(req:Request,res:Response)=>{

    const { name, link, areas, images, description,owner,group} = req.body;


    let data: any = {};

    if (name !== undefined) data.name = name;
    if (group !== undefined) data.group = group;
    if (owner !== undefined) data.owner = owner;
    if (link !== undefined) data.link = link;
    if (areas !== undefined) data.areas = areas;
    if (description !== undefined) data.description = description;

       Proyect.findOneAndUpdate({_id: req.params.id},data,{new:true},(err:any, user:any)=>{

            if (err) return res.status(500).json({ error: err });

                if (user) return res.status(200).json(user);

                if (!user) return res.status(400).json({ error: err });
        });

}

//Eliminar

export const deleteOneProyect = async (req: Request, res: Response) => {
    

    const { id } = req.params;

    await Proyect.remove({_id: req.params.id}, (err: any,) => {
        
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({message:"Proyecto eliminado correctamente"})

    });
}