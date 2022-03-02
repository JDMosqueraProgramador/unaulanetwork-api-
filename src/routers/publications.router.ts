import express from 'express';
import { createPublication } from '../controllers/publication.controllers';


const Router = express.Router();

Router.post("/post", createPublication)


export default Router;

