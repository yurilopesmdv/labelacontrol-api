import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import customerService from "../services/customers";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, phone, email, instagram } = req.body;
    const customer = await customerService.createCustomer(name, phone, email, instagram);
    res.status(httpStatus.CREATED).json(customer);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(httpStatus.OK).json(customers);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const customer = await customerService.getCustomerById(id);
    res.status(httpStatus.OK).json(customer);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name, phone, email, instagram } = req.body;
    const customer = await customerService.updateCustomer(id, name, phone, email, instagram);
    res.status(httpStatus.OK).json(customer);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await customerService.deleteCustomer(id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}

const customerController = {
  create,
  getAll,
  getById,
  update,
  deleteCustomer,
};

export default customerController;
