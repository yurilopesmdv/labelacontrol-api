import { Request, Response } from "express";
import httpStatus from "http-status";
import salesService from "../services/sales.service";

async function createSale(req: Request, res: Response) {
  try {
    const { date, value } = req.body;
    const sale = await salesService.createSale(date, value);
    return res.status(httpStatus.CREATED).send(sale);
  } catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const salesController = {
  createSale
}

export default salesController;