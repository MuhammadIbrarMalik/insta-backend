import { Router } from "express";
import postController from "../../controller/post/index.js";
import postValidator from "../../validator/post/index.js";
import AuthenticateMiddleware from "../../middleware/authentication.js";

const postRouter = Router();
postRouter.get("/post", postController.getall);
postRouter.get("/post/:postid", AuthenticateMiddleware, postController.getone);
postRouter.post(
  "/post",
  AuthenticateMiddleware,
  postValidator.create,

  postController.create
);
postRouter.put("/post/:postid", AuthenticateMiddleware, postController.update);
postRouter.delete(
  "/post/:postid",
  AuthenticateMiddleware,
  postController.deleteone
);
postRouter.delete("/post", postController.deleteall);
postRouter.get("/timeline", AuthenticateMiddleware, postController.timeline);
export default postRouter;
