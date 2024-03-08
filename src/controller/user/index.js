import commentModel from "../../model/comment/index.js";
import userfollowerModel from "../../model/follower/index.js";
import postModel from "../../model/post/index.js";
import userModel from "../../model/user/index.js";

const userController = {
  getall: async (req, res) => {
    const user = await userModel.findAll({
      where: {},
    });
    res.json({
      message: "This is the list of all my users",
      user,
    });
  },
  getone: async (req, res) => {
    const payload = req.body;
    const user = await userModel.findByPk(req.user.id, {
      where: {},
    });
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "This is your required user",
      user,
    });
  },
  getprofile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findByPk(userId);
      if (!user) {
        res.json({
          message: "user not found",
        });
      }
      const posts = await postModel.findAll({ where: { UserId: userId } });
      const postcount = await postModel.count({ where: { UserId: userId } });
      const commentcount = await commentModel.count({
        where: { UserId: userId },
      });
      const followercount = await userfollowerModel.count({
        where: { followingId: userId },
      });
      const followingcount = await userfollowerModel.count({
        where: { followerId: userId },
      });

      res.json({
        user: {
          id: user.id,
          Name: user.Name,
          Email: user.Email,
          followercount,
          followingcount,
          postcount,
          commentcount,
          posts,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
    }
  },
  update: async (req, res) => {
    const payload = req.body;
    const user = await userModel.findByPk(req.user.id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    (user.Name = payload.Name),
      (user.Email = payload.Email),
      (user.Password = payload.Password),
      res.json({
        message: "User has been updated",
        user,
      });
  },
  deleteone: async (req, res) => {
    const payload = req.body;
    const user = await userModel.findByPk(req.user.id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    user.destroy();
    res.json({
      message: "User has been deleted",
    });
  },
  deleteall: async (req, res) => {
    const payload = req.body;
    const user = await userModel.destroy({
      where: {},
    });
    res.json({
      message: " All Users has been deleted",
    });
  },
};
export default userController;
