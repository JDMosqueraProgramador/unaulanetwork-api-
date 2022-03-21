import Publication from '../models/publications.models';
import { Request, Response } from "express";


export const createPublication = async(req:Request, res:Response) =>{
    
  
   
     const data = {
         user: req.body.user,
         description: req.body.description,
         media:req.body.media,
         publicationDate: new Date(),
         category: req.body.category,
         visibility: req.body.visibility,
         group: req.body.group,
         reactions: "like",
         comments: [],
         hashtags: req.body.hashtags
    }

    const publication = new Publication(data);
   
    await publication.save((err:any, publication:any) =>{

        if(err){
            return res.status(500).send({
                message: `Ha ocurrido un error al publicar: ${err}`
                
            })
            
        }

       return res.status(200).send({message:"Se ha publicado con éxito"})
    })

    
}