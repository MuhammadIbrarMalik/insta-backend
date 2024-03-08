import { Router } from "express";
import authenticationController from "../../controller/authentication/index.js";
import userValidator from "../../validator/user/index.js";
const authenticateRouter = Router();
authenticateRouter.post(
  "/login",
  userValidator.login,
  authenticationController.login
);
authenticateRouter.post(
  "/register",
  userValidator.register,
  authenticationController.register
);
export default authenticateRouter;
