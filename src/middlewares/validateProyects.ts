import { checkSchema } from "express-validator";
import Publication from "../models/publications.models";

const validateSchemaProyects = [
    checkSchema({
        owner: {},
        group: {},
        name:{},
        link:{},
        areas: {},
        images: {},
        description: {},
        developers: {}
    }),
];

export default validateSchemaProyects;
