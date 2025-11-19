import { getPool } from "../config/database";

async function createSupplier(name?: string, cnpj?: string, phone?: string, email?: string, instagram?: string) {
  const pool = getPool();
  try {
    const result = await pool.query(
      'INSERT INTO suppliers (name, cnpj, phone, email, instagram) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, cnpj, phone, email, instagram]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllSuppliers() {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getSupplierById(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM suppliers WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateSupplier(id: number, name?: string, cnpj?: string, phone?: string, email?: string, instagram?: string) {
  const pool = getPool();
  try {
    // Build dynamic query
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (cnpj !== undefined) {
      fields.push(`cnpj = $${paramIndex++}`);
      values.push(cnpj);
    }
    if (phone !== undefined) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(phone);
    }
    if (email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(email);
    }
    if (instagram !== undefined) {
      fields.push(`instagram = $${paramIndex++}`);
      values.push(instagram);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);

    values.push(id);
    const query = `UPDATE suppliers SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteSupplier(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query('DELETE FROM suppliers WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const supplierRepository = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};

export default supplierRepository;
