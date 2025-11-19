import { Router } from "express";
import customerSchema from "../schemas/customers";
import validations from "../middlewares/validateEntries";
import customerController from "../controllers/customers";

const customerRouter = Router();

customerRouter
  .post(
    "/",
    validations.validateBody(customerSchema.createCustomer),
    customerController.create
  )
  .get("/", customerController.getAll)
  .get("/:id", customerController.getById)
  .put(
    "/:id",
    validations.validateBody(customerSchema.updateCustomer),
    customerController.update
  )
  .delete("/:id", customerController.deleteCustomer);

export default customerRouter;
