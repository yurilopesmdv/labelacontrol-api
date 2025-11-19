import supplierRepository from "../repositories/suppliers";
import { throwError } from "../errors/customError";

async function createSupplier(name?: string, cnpj?: string, phone?: string, email?: string, instagram?: string) {
  const supplier = await supplierRepository.createSupplier(name, cnpj, phone, email, instagram);
  return supplier;
}

async function getAllSuppliers() {
  const suppliers = await supplierRepository.getAllSuppliers();
  return suppliers;
}

async function getSupplierById(id: number) {
  const supplier = await supplierRepository.getSupplierById(id);
  if (!supplier) {
    throwError(404, "Supplier not found");
  }
  return supplier;
}

async function updateSupplier(id: number, name?: string, cnpj?: string, phone?: string, email?: string, instagram?: string) {
  const existingSupplier = await supplierRepository.getSupplierById(id);
  if (!existingSupplier) {
    throwError(404, "Supplier not found");
  }
  const supplier = await supplierRepository.updateSupplier(id, name, cnpj, phone, email, instagram);
  return supplier;
}

async function deleteSupplier(id: number) {
  const existingSupplier = await supplierRepository.getSupplierById(id);
  if (!existingSupplier) {
    throwError(404, "Supplier not found");
  }
  await supplierRepository.deleteSupplier(id);
}

const supplierService = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};

export default supplierService;
