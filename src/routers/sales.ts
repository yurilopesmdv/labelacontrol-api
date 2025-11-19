import { Router } from "express";
import salesSchema from "../schemas/sales";
import validations from "../middlewares/validateEntries";
import salesController from "../controllers/sales";
import { authenticateToken } from "../middlewares/authentication";

const salesRouter = Router();

salesRouter.use(authenticateToken);

salesRouter
  .post(
    "/",
    validations.validateBody(salesSchema.createSale),
    salesController.create
  )
  .get("/", salesController.getAll)
  .get("/:id", salesController.getById);

export default salesRouter;
