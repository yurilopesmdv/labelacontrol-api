import { Router } from "express";
import salesController from "../controllers/sales.controller";

const router = Router()
router
  .post('/sales', salesController.createSale)
  .get('/sales', salesController.getAllSales)
  .get('/sales/:day')
  .get('/sales/month')
  .get('/sales/month/details')
  .delete('/sales/:id', salesController.deleteSale)
  .put('/sales/:id')

export default router;