import { Router } from "express";

import followerController from "../../controller/follower/index.js";
import AuthenticateMiddleware from "../../middleware/authentication.js";

const followerRouter = Router();

followerRouter.post(
  "/follow",
  AuthenticateMiddleware,
  followerController.follow
);

export default followerRouter;
