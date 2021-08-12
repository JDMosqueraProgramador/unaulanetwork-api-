import express from "express";

import { getOneUser, setUsers } from "../controllers/users.controllers";

const Router = express.Router();

Router.get('/:user', getOneUser);

Router.post('/', setUsers);


export default Router;