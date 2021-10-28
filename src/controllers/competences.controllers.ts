import { Request, response, Response } from "express";
import Competence from '../models/competences.models';

//Método asíncrono para obtener las competenecias.
export const getCompetences = async (req: Request, res: Response) => {

    const { name } = req.query;
    
    console.log(name);
    //const {competenceSearch} = req.body;
    //const parameters = (area != undefined) ? {area}:{name};
    const searchCompetences = String(name);

    //Se intenta buscar las competencias:
    await Competence.find({$or:[{name: new RegExp(searchCompetences, 'gi')}, {description:new RegExp(searchCompetences, 'gi')}]} , (err: any, competences: any) => {
    
        //Si resulta error, muestra un códgio 500 y el error
        if (err) return res.status(500).json({ error: err });

        //Si encuentra, retorna las competencias encontradas
        if (competences) return res.status(200).json(competences);

        //Si no se encuentra, lanza un código 404
        return res.status(404).json({ error: "No se encontraron resultados" });
    }).limit(5); 

};

export const getCompetencesByArea = async(req: Request, res: Response) =>{
    const {area} = req.query;
    console.log(area);
    const searchCompetences = String(area);
    // const parameters = (area != undefined) ? {area}:{name};
    
    //Se intenta buscar las competencias:
    await Competence.find({$or:[{area:new RegExp(searchCompetences, 'gi')} ]} , (err: any, competences: any) => {

        //Si resulta error, muestra un códgio 500 y el error
        if (err) return res.status(500).json({ error: err });

        //Si encuentra, retorna las competencias encontradas
        if (competences) return res.status(200).json(competences);

        //Si no se encuentra, lanza un código 404
        return res.status(404).json({ error: "No se encontraron resultados" });
    }).limit(5);
    
};

//Método ansícrono para crear una competencia
export const createOneCompetence = async (req: Request, res: Response) => {

    const {name, description, area} = req.body;
    

    const competenceDB = await Competence.findOne({name,area});

    if (competenceDB) {
        return res.status(400).json({
            error: "La competencia ya existe",
        });
    }

    const competence = new Competence({ name, description, area });
    await competence.save();
    return res.status(200).json({ competence });
}


export const deleteOneCompetence = async (req: Request, res: Response) => {
    

    const { competenceName } = req.params;

    await Competence.remove({ name : competenceName }, (err: any,) => {
        
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({message:"Competencia eliminada correctamente"})

    });

}

export const updateOneCompetence = async (req: Request, res: Response) =>{
    


    console.log(req.params)


}   

//Posible reutilizacion en otro lugar
 // if(name == ""){
    //     return res.status(400).json({
    //         error: "El nombre de la competencia NO debe estar vacío"
    //     })
    // }

    //  if(description == ""){
    //     return res.status(400).json({
    //         error: "La descripción de la competencia NO debe estar vacía"
    //     })
    // }