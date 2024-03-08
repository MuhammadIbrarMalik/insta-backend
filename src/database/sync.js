import commentModel from "../model/comment/index.js";
import userfollowerModel from "../model/follower/index.js";
import postModel from "../model/post/index.js";
import userModel from "../model/user/index.js";

const syncDb = async () => {
  await userModel.sync({
    alter: true,
    force: false,
  });
  await postModel.sync({
    alter: true,
    force: false,
  });
  await commentModel.sync({
    alter: true,
    force: false,
  });
  await userfollowerModel.sync({
    alter: true,
    force: false,
  });
};

export default syncDb;
