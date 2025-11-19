import salesRepository from "../repositories/sales";
import productRepository from "../repositories/products";
import customerRepository from "../repositories/customers"; // Assuming this exists and has getById
import { throwError } from "../errors/customError";

interface ProductSale {
  product_id: number;
  quantity: number;
}

async function createSale(customer_id: number, payment_method_id: number, products: ProductSale[]) {
  // Validate Customer
  const customer = await customerRepository.getCustomerById(customer_id);
  if (!customer) {
    throwError(404, "Customer not found");
  }

  // Validate Products and Calculate Total
  let total_cents = 0;
  for (const item of products) {
    const product = await productRepository.getProductById(item.product_id);
    if (!product) {
      throwError(404, `Product ID ${item.product_id} not found`);
    }
    if (product.stock_qty < item.quantity) {
      throwError(409, `Insufficient stock for product ${product.name}`);
    }
    total_cents += product.sale_price_cents * item.quantity;
  }

  // Create Sale
  const sale = await salesRepository.createSale(customer_id, payment_method_id, total_cents, products);
  return sale;
}

async function getAllSales() {
  const sales = await salesRepository.getAllSales();
  return sales;
}

async function getSaleById(id: number) {
  const sale = await salesRepository.getSaleById(id);
  if (!sale) {
    throwError(404, "Sale not found");
  }
  return sale;
}

const salesService = {
  createSale,
  getAllSales,
  getSaleById,
};

export default salesService;
