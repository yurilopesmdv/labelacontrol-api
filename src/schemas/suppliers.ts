import Joi from "joi";

const createSupplier = Joi.object({
  name: Joi.string().optional(),
  cnpj: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  instagram: Joi.string().optional(),
});

const updateSupplier = Joi.object({
  name: Joi.string().optional(),
  cnpj: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  instagram: Joi.string().optional(),
});

const supplierSchema = {
  createSupplier,
  updateSupplier,
};

export default supplierSchema;
