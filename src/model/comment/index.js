import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import userModel from "../user/index.js";
import postModel from "../post/index.js";

const commentModel = sequelize.define(
  "Comment",
  {
    // Model attributes are defined here

    Description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: false,
  }
);
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);
postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
export default commentModel;
