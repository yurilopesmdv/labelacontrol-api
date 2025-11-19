import { getPool } from "../config/database";

async function createCustomer(name?: string, phone?: string, email?: string, instagram?: string) {
  const pool = getPool();
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, phone, email, instagram) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, email, instagram]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllCustomers() {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM customers');
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCustomerById(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query(`
      SELECT 
        c.*,
        (
          SELECT COALESCE(json_agg(
            json_build_object(
              'id', s.id,
              'total_cents', s.total_cents,
              'created_at', s.created_at,
              'products', (
                SELECT COALESCE(json_agg(
                  json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'sale_price_cents', p.sale_price_cents,
                    'quantity', sp_counts.qty
                  )
                ), '[]'::json)
                FROM (
                   SELECT product_id, COUNT(*) as qty
                   FROM sales_products
                   WHERE sale_id = s.id
                   GROUP BY product_id
                ) sp_counts
                JOIN products p ON sp_counts.product_id = p.id
              )
            )
          ), '[]'::json)
          FROM sales s
          WHERE s.customer_id = c.id
        ) as sales
      FROM customers c
      WHERE c.id = $1
    `, [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateCustomer(id: number, name?: string, phone?: string, email?: string, instagram?: string) {
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
    const query = `UPDATE customers SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteCustomer(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const customerRepository = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

export default customerRepository;
