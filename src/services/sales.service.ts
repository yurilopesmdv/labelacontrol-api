import dayjs from "dayjs";
import salesRepository from "../repositories/sales.repository";
import notFoundError from "../errors/notFound.error";

async function createSale(date: Date, value: number) {
  const dateFormated = dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
  return await salesRepository.createSale(dateFormated, value);
}

async function getAllSales() {
  return await salesRepository.getAllSales();
}

async function deleteSale(id: number) {
  const salesExists = await salesRepository.getSaleById(id);
  if (!salesExists) throw notFoundError();
  const deletedSale = await salesRepository.deleteSale(id)
}

const salesService = {
  createSale,
  getAllSales,
  deleteSale
}

export default salesService