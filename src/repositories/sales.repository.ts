import { prisma } from "../config/database";

async function createSale(date: Date, value: number) {
  return prisma.sales.create({
    data: {
      date,
      value
    }
  })
}

async function getAllSales() {
  return prisma.sales.findMany({
    orderBy: {
      date: 'desc'
    }
  })
}

const salesRepository = {
  createSale,
  getAllSales
}

export default salesRepository;