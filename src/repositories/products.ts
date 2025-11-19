import { getPool } from "../config/database";

async function createProduct(name: string, description: string | undefined, cost_price_cents: number, sale_price_cents: number, stock_qty: number) {
  const pool = getPool();
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, cost_price_cents, sale_price_cents, stock_qty) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, cost_price_cents, sale_price_cents, stock_qty]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllProducts() {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getProductById(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateProduct(id: number, name?: string, description?: string, cost_price_cents?: number, sale_price_cents?: number, stock_qty?: number) {
  const pool = getPool();
  try {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (cost_price_cents !== undefined) {
      fields.push(`cost_price_cents = $${paramIndex++}`);
      values.push(cost_price_cents);
    }
    if (sale_price_cents !== undefined) {
      fields.push(`sale_price_cents = $${paramIndex++}`);
      values.push(sale_price_cents);
    }
    if (stock_qty !== undefined) {
      fields.push(`stock_qty = $${paramIndex++}`);
      values.push(stock_qty);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);

    values.push(id);
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteProduct(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const productRepository = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productRepository;
