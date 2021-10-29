import express from "express";

import { follow, unfollow, myFollowers, myFollowings} from "../controllers/follow.controllers";

const Router = express.Router();


Router.get("/following/:id", myFollowings)

Router.get("/followers/:id", myFollowers);

Router.delete("/:id/unfollow/:userUnFollow",unfollow );

Router.post("/:id/follow/:userFollow", follow);


export default Router;
