import userfollowerModel from "../../model/follower/index.js";

const followerController = {
  follow: async (req, res) => {
    try {
      const payload = req.body;
      const user = await userfollowerModel.create({
        followerId: req.user.id,
        followingId: payload.followingId,
      });
      res.json({
        message: `User ${req.user.id} followed ${payload.followingId}`,
        user,
      });
    } catch (error) {
      res.json({ error });
    }
  },
};
export default followerController;
