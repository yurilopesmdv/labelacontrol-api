import { Router } from "express";
import productSchema from "../schemas/products";
import validations from "../middlewares/validateEntries";
import productController from "../controllers/products";
import { authenticateToken } from "../middlewares/authentication";

const productRouter = Router();

productRouter.use(authenticateToken);

productRouter
  .post(
    "/",
    validations.validateBody(productSchema.createProduct),
    productController.create
  )
  .get("/", productController.getAll)
  .get("/:id", productController.getById)
  .put(
    "/:id",
    validations.validateBody(productSchema.updateProduct),
    productController.update
  )
  .delete("/:id", productController.deleteProduct);

export default productRouter;
