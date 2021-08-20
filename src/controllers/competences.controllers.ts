import { Request, Response} from 'express';
import Competence from '../models/competences.models';

const getCompetences = async(req:Request,res:Response)=>{

    const area=req.params.area;
    await Competence.find({area},(err:any,competences:any)=>{
        if (err) return res.status(500).json({ error: err });

        if (competences) return res.status(200).json(competences);

        return res.status(404).json({ error: "No se encontraron resultados" });
    });
}