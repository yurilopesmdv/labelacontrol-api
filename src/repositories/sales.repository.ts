import { prisma } from "../config/database";

async function createSale(date: string, value: number) {
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

async function getSaleById (id: number) {
  return prisma.sales.findUnique({
    where: {id}
  })
}

async function deleteSale(id: number) {
  return prisma.sales.delete({
    where: {
      id
    }
  })
}

const salesRepository = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale
}

export default salesRepository;