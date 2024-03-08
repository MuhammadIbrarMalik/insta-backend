import { Router } from "express";
import commentController from "../../controller/comment/index.js";
import commentValidator from "../../validator/comment/index.js";
import AuthenticateMiddleware from "../../middleware/authentication.js";

const commentRouter = Router();
commentRouter.get("/comment", commentController.getall);
commentRouter.get(
  "/comment/:commentid",
  AuthenticateMiddleware,
  commentController.getone
);
commentRouter.post(
  "/comment",
  AuthenticateMiddleware,
  commentValidator.create,
  commentController.create
);
commentRouter.put(
  "/comment/:commentid",
  AuthenticateMiddleware,
  commentController.update
);
commentRouter.delete(
  "/comment/:commentid",
  AuthenticateMiddleware,
  commentController.deleteone
);
commentRouter.delete("/comment", commentController.deleteall);
export default commentRouter;
