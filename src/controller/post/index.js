import userfollowerModel from "../../model/follower/index.js";
import postModel from "../../model/post/index.js";
import userModel from "../../model/user/index.js";

const postController = {
  getall: async (req, res) => {
    const post = await postModel.findAll({
      where: {},
    });
    res.json({
      message: "This is the list of all my post",
      post,
    });
  },
  getone: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const post = await postModel.findByPk(params.postid, {
      where: {},
    });
    if (!post) {
      res.json({
        message: "post not found",
      });
    }
    res.json({
      message: "This is your required post",
      post,
    });
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const post = await postModel.create({
        Tittle: payload.Tittle,
        Description: payload.Description,
        UserId: req.user.id,
      });
      res.json({
        message: "post has been created",
        post,
      });
    } catch (error) {
      res.json({ error });
    }
  },
  update: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const post = await postModel.findByPk(params.postid);
    if (!post) {
      res.json({
        message: "post not found",
      });
    }
    (post.Tittle = payload.Tittle),
      (post.Description = payload.Description),
      res.json({
        message: "post has been updated",
        post,
      });
  },
  deleteone: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const post = await userModel.findByPk(params.postid);
    if (!post) {
      res.json({
        message: "post not found",
      });
    }
    post.destroy();
    res.json({
      message: "post has been deleted",
    });
  },
  deleteall: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const post = await postModel.destroy({
      where: {},
    });
    res.json({
      message: " All posts has been deleted",
    });
  },
  timeline: async (req, res) => {
    try {
      const userId = req.user.id;

      const followingUsers = await userfollowerModel.findAll({
        where: { followerId: userId },
        attributes: [],
        include: [
          {
            model: userModel,
            as: "following",
            attributes: ["id"],
          },
        ],
      });

      const followingUserIds = followingUsers.map((user) => user.following.id);

      const timelinePosts = await postModel.findAll({
        where: { UserId: followingUserIds },
        include: [{ model: userModel, attributes: ["id", "Name", "Email"] }],
      });

      res.json({ timelinePosts });
    } catch (error) {
      console.error("Error in timeline method:", error);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },
};
export default postController;
