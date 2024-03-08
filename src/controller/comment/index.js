import commentModel from "../../model/comment/index.js";

const commentController = {
  getall: async (req, res) => {
    const comment = await commentModel.findAll({
      where: {},
    });
    res.json({
      message: "This is the list of all my comment",
      comment,
    });
  },
  getone: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const comment = await commentModel.findByPk(params.commentid, {
      where: {},
    });
    if (!comment) {
      res.json({
        message: "comment not found",
      });
    }
    res.json({
      message: "This is your required comment",
      comment,
    });
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const comment = await commentModel.create({
        Description: payload.Description,
        UserId: req.user.id,
        PostId: payload.PostId,
      });
      res.json({
        message: "comment has been created",
        comment,
      });
    } catch (error) {
      res.json({ error });
    }
  },
  update: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const comment = await commentModel.findByPk(params.commentid);
    if (!comment) {
      res.json({
        message: "comment not found",
      });
    }
    (comment.Description = payload.Description),
      res.json({
        message: "comment has been updated",
        comment,
      });
  },
  deleteone: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const comment = await commentModel.findByPk(params.commentid);
    if (!comment) {
      res.json({
        message: "coment not found",
      });
    }
    comment.destroy();
    res.json({
      message: "comment has been deleted",
    });
  },
  deleteall: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    const comment = await commentModel.destroy({
      where: {},
    });
    res.json({
      message: " All comments has been deleted",
    });
  },
};
export default commentController;
