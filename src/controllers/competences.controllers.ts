import { Request, Response } from "express";
import Competence from "../models/competences.models";


export const getCompetences = async (req: Request, res: Response) => {

    const {area,name} = req.query;
    const parameters = (area != undefined) ? {area}:{name};

    await Competence.find( parameters , (err: any, competences: any) => {
        
        if (err) return res.status(500).json({ error: err });

        if (competences) return res.status(200).json(competences);

        return res.status(404).json({ error: "No se encontraron resultados" });
    }); 

};






