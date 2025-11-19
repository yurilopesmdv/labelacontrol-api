import { Router } from "express";
import supplierSchema from "../schemas/suppliers";
import validations from "../middlewares/validateEntries";
import supplierController from "../controllers/suppliers";
import { authenticateToken } from "../middlewares/authentication";

const supplierRouter = Router();

supplierRouter.use(authenticateToken);

supplierRouter
  .post(
    "/",
    validations.validateBody(supplierSchema.createSupplier),
    supplierController.create
  )
  .get("/", supplierController.getAll)
  .get("/:id", supplierController.getById)
  .put(
    "/:id",
    validations.validateBody(supplierSchema.updateSupplier),
    supplierController.update
  )
  .delete("/:id", supplierController.deleteSupplier);

export default supplierRouter;
