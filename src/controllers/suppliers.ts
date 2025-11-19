import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import supplierService from "../services/suppliers";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, cnpj, phone, email, instagram } = req.body;
    const supplier = await supplierService.createSupplier(name, cnpj, phone, email, instagram);
    res.status(httpStatus.CREATED).json(supplier);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(httpStatus.OK).json(suppliers);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const supplier = await supplierService.getSupplierById(id);
    res.status(httpStatus.OK).json(supplier);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name, cnpj, phone, email, instagram } = req.body;
    const supplier = await supplierService.updateSupplier(id, name, cnpj, phone, email, instagram);
    res.status(httpStatus.OK).json(supplier);
  } catch (error) {
    next(error);
  }
}

async function deleteSupplier(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await supplierService.deleteSupplier(id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}

const supplierController = {
  create,
  getAll,
  getById,
  update,
  deleteSupplier,
};

export default supplierController;
