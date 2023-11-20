import { Router } from "express";

const router = Router()
router
  .post('/sales')
  .get('/sales')
  .get('/sales/:day')
  .get('/sales/month')
  .get('/sales/month/details')

export default router;