import Competence from "../models/competences.models";





export const existCompetenceByName = async (competenceName: any) => {
    

    const existCompetence = await Competence.findOne({ name: competenceName });

    if (!existCompetence) {
        throw new Error("Competencia no encontrada")
    }

}