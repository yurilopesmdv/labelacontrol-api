import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import productService from "../services/products";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, cost_price_cents, sale_price_cents, stock_qty } = req.body;
    const product = await productService.createProduct(name, description, cost_price_cents, sale_price_cents, stock_qty);
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAllProducts();
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    res.status(httpStatus.OK).json(product);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name, description, cost_price_cents, sale_price_cents, stock_qty } = req.body;
    const product = await productService.updateProduct(id, name, description, cost_price_cents, sale_price_cents, stock_qty);
    res.status(httpStatus.OK).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await productService.deleteProduct(id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}

const productController = {
  create,
  getAll,
  getById,
  update,
  deleteProduct,
};

export default productController;
