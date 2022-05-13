import express from 'express';
import { createPublication, commentPublication } from '../controllers/publication.controllers';
import validateSchemaPublication from '../middlewares/validatePublication';


const Router = express.Router();

Router.post("/post", validateSchemaPublication, createPublication)
Router.put("/comment/:idPublication", commentPublication)

export default Router;

