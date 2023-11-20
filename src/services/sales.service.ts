import salesRepository from "../repositories/sales.repository";

async function createSale(date: Date, value: number) {
  return await salesRepository.createSale(date, value);
}

const salesService = {
  createSale
}

export default salesService