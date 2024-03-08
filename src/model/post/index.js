import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import userModel from "../user/index.js";

const postModel = sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    Tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
userModel.hasMany(postModel);
postModel.belongsTo(userModel);
export default postModel;
