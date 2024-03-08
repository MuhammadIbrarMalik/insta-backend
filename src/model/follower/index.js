import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import userModel from "../user/index.js";

const userfollowerModel = sequelize.define(
  "userFollower",
  {},
  {
    timestamps: false,
  }
);
userfollowerModel.belongsTo(userModel, { as: "follower" });
userfollowerModel.belongsTo(userModel, { as: "following" });

userModel.belongsToMany(userModel, {
  through: userfollowerModel,
  as: "followers",
  foreignKey: "followingId",
});

userModel.belongsToMany(userModel, {
  through: userfollowerModel,
  as: "followings",
  foreignKey: "followerId",
});

export default userfollowerModel;
