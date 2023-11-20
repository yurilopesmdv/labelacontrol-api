import { Request, Response } from "express";
import httpStatus from "http-status";
import salesService from "../services/sales.service";
import { AplicationError } from "../protocols";

async function createSale(req: Request, res: Response) {
  try {
    const { date, value } = req.body;
    const sale = await salesService.createSale(date, value);
    return res.status(httpStatus.CREATED).send(sale);
  } catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getAllSales(req: Request, res: Response) {
  try {
    const sales = await salesService.getAllSales();
    return res.status(httpStatus.OK).send(sales);
  } catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteSale(req: Request, res: Response) {
  try {
    const saleId =  parseInt(req.params.id)
    const sale = await salesService.deleteSale(saleId);
    return res.sendStatus(httpStatus.OK);
  } catch (error: any) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateSale(req: Request, res: Response) {
  try {
    const saleId =  parseInt(req.params.id)
    const { date, value } = req.body
    const sale = await salesService.updateSale(saleId, date, value);
    return res.status(httpStatus.OK).send(sale)
  } catch (error: any) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    }
    console.log(error.message)
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const salesController = {
  createSale,
  getAllSales,
  deleteSale,
  updateSale
}

export default salesController;