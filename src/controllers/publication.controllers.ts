import Publication from "../models/publications.models";
import { Request, Response } from "express";

export const createPublication = async (req: Request, res: Response) => {
    const data: Object = {
        user: req.body.user,
        description: req.body.description,
        media: req.body.media,
        publicationDate: new Date(),
        category: req.body.category,
        visibility: req.body.visibility,
        group: req.body.group,
        reactions: "like",
        comments: [],
        hashtags: req.body.hashtags,
    };

    const publication = new Publication(data);

    await publication.save((err: any, publication: any) => {
        if (err) {
            return res.status(500).send({
                message: `Ha ocurrido un error al publicar: ${err}`,
            });
        }

        return res.status(200).send({ message: "Se ha publicado con éxito" });
    });
};

export const commentPublication = async (req: Request, res: Response) => {
    
    const {user, comment} = req.body;
    
    const commentData: Object = {
        user,
        comment,
        date: new Date(),
    };

    const publication = await Publication.findById(req.params.idPublication);

    if (!publication) {
        return res.status(400).json({ error: `NO SE HA ENCONTRADO UNA PUBLICACIÓN CON EL ID: ${req.params.idPublication}`});
    }

    publication.comments.push(commentData);
    publication.save((err: any, publication: any) => {
        if (err) return res.status(500).json({ error: err });

        if (publication) return res.status(200).json(publication);
    });
};
