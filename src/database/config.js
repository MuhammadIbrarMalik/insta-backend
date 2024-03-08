import { Sequelize } from "sequelize";
import "dotenv/config.js";
const env = process.env;
const sequelize = new Sequelize(env.DbName, env.Db, env.DbPassword, {
  host: env.Dbhost,
  dialect: env.Dbdialect,
});
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default sequelize;
export { connectDb };
