import salesRepository from "../repositories/sales.repository";

async function createSale(date: Date, value: number) {
  return await salesRepository.createSale(date, value);
}

async function getAllSales() {
  return await salesRepository.getAllSales();
}

const salesService = {
  createSale,
  getAllSales
}

export default salesService