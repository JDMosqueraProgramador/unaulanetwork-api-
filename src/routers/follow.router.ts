import express from "express";

import { follow, unfollow} from "../controllers/follow.controllers";

const Router = express.Router();

Router.delete("/:id/unfollow/:userUnFollow",unfollow );

Router.post("/:id/follow/:userFollow", follow);

export default Router;