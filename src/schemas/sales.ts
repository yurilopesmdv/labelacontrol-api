import Joi from "joi";

const createSale = Joi.object({
  customer_id: Joi.number().integer().required(),
  payment_method_id: Joi.number().integer().required(),
  products: Joi.array().items(
    Joi.object({
      product_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).min(1).required(),
});

const salesSchema = {
  createSale,
};

export default salesSchema;
