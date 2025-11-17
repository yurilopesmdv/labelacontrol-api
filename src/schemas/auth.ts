import Joi from "joi";

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(100).required(),
});

const authSchema = {
  signIn,
  createUser,
}

export default authSchema;