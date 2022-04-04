import express from 'express';
import { createPublication, commentPublication } from '../controllers/publication.controllers';


const Router = express.Router();

Router.post("/post", createPublication)
Router.put("/comment/:idPublication", commentPublication)

export default Router;

