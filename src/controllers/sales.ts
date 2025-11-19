import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import salesService from "../services/sales";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { customer_id, payment_method_id, products } = req.body;
    const sale = await salesService.createSale(customer_id, payment_method_id, products);
    res.status(httpStatus.CREATED).json(sale);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const sales = await salesService.getAllSales();
    res.status(httpStatus.OK).json(sales);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const sale = await salesService.getSaleById(id);
    res.status(httpStatus.OK).json(sale);
  } catch (error) {
    next(error);
  }
}

const salesController = {
  create,
  getAll,
  getById,
};

export default salesController;
