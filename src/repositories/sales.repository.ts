import { prisma } from "../config/database";

async function createSale(date: Date, value: number) {
  return prisma.sales.create({
    data: {
      date,
      value
    }
  })
}

const salesRepository = {
  createSale
}

export default salesRepository;