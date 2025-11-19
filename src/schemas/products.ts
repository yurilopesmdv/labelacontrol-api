import Joi from "joi";

const createProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  cost_price_cents: Joi.number().integer().min(0).required(),
  sale_price_cents: Joi.number().integer().min(0).required(),
  stock_qty: Joi.number().integer().min(0).default(0),
});

const updateProduct = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  cost_price_cents: Joi.number().integer().min(0).optional(),
  sale_price_cents: Joi.number().integer().min(0).optional(),
  stock_qty: Joi.number().integer().min(0).optional(),
});

const productSchema = {
  createProduct,
  updateProduct,
};

export default productSchema;
