import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

const userModel = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    Password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: false,
  }
);
export default userModel;
