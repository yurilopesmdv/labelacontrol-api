import productRepository from "../repositories/products";
import { throwError } from "../errors/customError";

async function createProduct(name: string, description: string | undefined, cost_price_cents: number, sale_price_cents: number, stock_qty: number) {
  const product = await productRepository.createProduct(name, description, cost_price_cents, sale_price_cents, stock_qty);
  return product;
}

async function getAllProducts() {
  const products = await productRepository.getAllProducts();
  return products;
}

async function getProductById(id: number) {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throwError(404, "Product not found");
  }
  return product;
}

async function updateProduct(id: number, name?: string, description?: string, cost_price_cents?: number, sale_price_cents?: number, stock_qty?: number) {
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    throwError(404, "Product not found");
  }
  const product = await productRepository.updateProduct(id, name, description, cost_price_cents, sale_price_cents, stock_qty);
  return product;
}

async function deleteProduct(id: number) {
  const existingProduct = await productRepository.getProductById(id);
  if (!existingProduct) {
    throwError(404, "Product not found");
  }
  await productRepository.deleteProduct(id);
}

const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
