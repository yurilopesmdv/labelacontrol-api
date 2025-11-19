import Joi from "joi";

const createCustomer = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  instagram: Joi.string().optional(),
});

const updateCustomer = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  instagram: Joi.string().optional(),
});

const customerSchema = {
  createCustomer,
  updateCustomer,
};

export default customerSchema;
