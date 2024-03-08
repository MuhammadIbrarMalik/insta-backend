import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../model/user/index.js";

const authenticationController = {
  login: async (req, res) => {
    const payload = req.body;
    const user = await userModel.findOne({
      where: { Email: payload.Email },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const result = await bcrypt.compare(payload.Password, user.Password);
    console.log(result, "resultresultresult");
    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { Password: user.Password, Email: user.Email, id: user.id },
      process.env.key
    );
    res.json({
      message: "Successfully Login",
      token,
    });
  },
  register: async (req, res) => {
    try {
      const payload = req.body;

      const doUserAlreadyExist = await userModel.findOne({
        where: { Email: payload.Email },
      });
      if (doUserAlreadyExist) {
        return res.json({ message: "This Email Already Exist" });
      }
      const saltRounds = 10;
      const hPassword = await bcrypt.hash(payload.Password, saltRounds);

      const user = await userModel.create({
        Name: payload.Name,
        Email: payload.Email,
        Password: hPassword,
      });
      res.json({
        message: "User has been Registered",
        user,
      });
    } catch (error) {
      res.json({ error });
    }
  },
};
export default authenticationController;
