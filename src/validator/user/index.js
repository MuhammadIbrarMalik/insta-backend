import Joi from "joi";
const userValidator = {
  login: (req, res, next) => {
    const schema = Joi.object({
      Email: Joi.string().min(3).max(30).required(),
      Password: Joi.string().min(3).max(30).required(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res.status(400).json({
        message: "invalid data",
        error: response.error,
      });
    }
    next();
  },
  register: (req, res, next) => {
    const schema = Joi.object({
      Name: Joi.string().alphanum().min(3).max(30).required(),
      Email: Joi.string().min(3).max(30),
      Password: Joi.string().min(3).max(30),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res.status(400).json({
        message: "invalid data",
        error: response.error,
      });
    }
    next();
  },
};
export default userValidator;
