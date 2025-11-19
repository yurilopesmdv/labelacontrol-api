import { Router } from "express";
import customerSchema from "../schemas/customers";
import validations from "../middlewares/validateEntries";
import customerController from "../controllers/customers";
import { authenticateToken } from "../middlewares/authentication";

const customerRouter = Router();

customerRouter.use(authenticateToken);

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
