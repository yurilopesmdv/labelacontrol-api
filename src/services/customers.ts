import customerRepository from "../repositories/customers";
import { throwError } from "../errors/customError";

async function createCustomer(name?: string, phone?: string, email?: string, instagram?: string) {
  const customer = await customerRepository.createCustomer(name, phone, email, instagram);
  return customer;
}

async function getAllCustomers() {
  const customers = await customerRepository.getAllCustomers();
  return customers;
}

async function getCustomerById(id: number) {
  const customer = await customerRepository.getCustomerById(id);
  if (!customer) {
    throwError(404, "Customer not found");
  }
  return customer;
}

async function updateCustomer(id: number, name?: string, phone?: string, email?: string, instagram?: string) {
  const existingCustomer = await customerRepository.getCustomerById(id);
  if (!existingCustomer) {
    throwError(404, "Customer not found");
  }
  const customer = await customerRepository.updateCustomer(id, name, phone, email, instagram);
  return customer;
}

async function deleteCustomer(id: number) {
  const existingCustomer = await customerRepository.getCustomerById(id);
  if (!existingCustomer) {
    throwError(404, "Customer not found");
  }
  await customerRepository.deleteCustomer(id);
}

const customerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

export default customerService;
