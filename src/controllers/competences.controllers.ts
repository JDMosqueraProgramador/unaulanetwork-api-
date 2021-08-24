import { Request, Response } from "express";
import Competence from '../models/competences.models';

//Método asíncrono para obtener las competenecias.
export const getCompetences = async (req: Request, res: Response) => {

    const {area,name} = req.query;
    const parameters = (area != undefined) ? {area}:{name};

    //Se intenta buscar las competencias:
    await Competence.find( parameters , (err: any, competences: any) => {
        
        //Si resulta error, muestra un códgio 500 y el error
        if (err) return res.status(500).json({ error: err });

        //Si encuentra, retorna las competencias encontradas
        if (competences) return res.status(200).json(competences);

        //Si no se encuentra, lanza un código 404
        return res.status(404).json({ error: "No se encontraron resultados" });
    }); 

    //TODO: Hacer regex en la búsqueda de competencias:, {description: new RegExp(competenceSearch, 'g')}
                                                            //let re = new RegExp(`\{competenceSearch}\`, 'g');
    let competenceSearch = "Web";
    await Competence.find(({name: new RegExp(competenceSearch, 'g')}), (err: any, competences: any)=>{
        
        //Si encuentra error en el server, lo muestra
        if (err) return res.status(500).json({ error: err });

        //Si encuentra, retorna las competencias encontradas
        if (competences) return res.status(200).json(competences);

        //Si no se encuentra, lanza un código 404
        return res.status(404).json({ error: "No se encontraron resultados" });

    })

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
