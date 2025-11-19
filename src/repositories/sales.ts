import { getPool } from "../config/database";
import { throwError } from "../errors/customError";

interface ProductSale {
  product_id: number;
  quantity: number;
}

async function createSale(customer_id: number, payment_method_id: number, total_cents: number, products: ProductSale[]) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert Sale
    const saleResult = await client.query(
      'INSERT INTO sales (customer_id, payment_method_id, total_cents) VALUES ($1, $2, $3) RETURNING id',
      [customer_id, payment_method_id, total_cents]
    );
    const saleId = saleResult.rows[0].id;

    // Process Products
    for (const product of products) {
      // Check stock and lock row
      const productResult = await client.query(
        'SELECT stock_qty FROM products WHERE id = $1 FOR UPDATE',
        [product.product_id]
      );

      if (productResult.rows.length === 0) {
        throwError(404, `Product ID ${product.product_id} not found`);
      }

      const currentStock = productResult.rows[0].stock_qty;

      if (currentStock < product.quantity) {
        throwError(409, `Insufficient stock for product ID ${product.product_id}`);
      }

      // Update Stock
      await client.query(
        'UPDATE products SET stock_qty = stock_qty - $1 WHERE id = $2',
        [product.quantity, product.product_id]
      );

      // Insert Sales Products
      // Assuming sales_products has a quantity column, if not, we might need to insert multiple rows or just link them.
      // Given the requirement "popular a tabela sales_products", and typical design, I'll assume quantity is needed or implied.
      // If the table structure provided strictly doesn't have quantity, I'll add it to the query and if it fails, it fails.
      // But wait, the user provided the SQL:
      // create table sales_products ( ... sale_id, product_id ... );
      // It DOES NOT have quantity.
      // However, selling 2 of the same product would require 2 rows or a quantity field.
      // I will add a quantity column to the query because it's the only logical way to handle "quantity" in a sale without inserting N rows.
      // If the user strictly wants N rows, I can do that too.
      // Let's assume standard design and try to insert quantity. If the user didn't add the column, this will error.
      // BUT, I can't see the DB.
      // I will insert N rows if quantity is > 1, to be safe with the provided SQL schema.
      // Actually, re-reading: "precisa popular a tabela sales_products, pois poderao ser enviados mais de um produto em uma sale"
      // This implies multiple products in a sale, but also potentially multiple OF THE SAME product.
      // If I insert N rows, it works with the provided schema.

      // Let's try to be smart. If I insert N rows for quantity 5, it's 5 inserts.
      // I'll do that to be strictly compliant with the provided SQL which lacked 'quantity'.

      for (let i = 0; i < product.quantity; i++) {
        await client.query(
          'INSERT INTO sales_products (sale_id, product_id) VALUES ($1, $2)',
          [saleId, product.product_id]
        );
      }
    }

    await client.query('COMMIT');
    return { id: saleId, customer_id, total_cents, products };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function getAllSales() {
  const pool = getPool();
  try {
    const result = await pool.query(`
      SELECT s.*, 
             json_agg(json_build_object('product_id', p.id, 'name', p.name)) as products
      FROM sales s
      JOIN sales_products sp ON s.id = sp.sale_id
      JOIN products p ON sp.product_id = p.id
      GROUP BY s.id
    `);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getSaleById(id: number) {
  const pool = getPool();
  try {
    const result = await pool.query(`
      SELECT s.*, 
             json_agg(json_build_object('product_id', p.id, 'name', p.name)) as products
      FROM sales s
      JOIN sales_products sp ON s.id = sp.sale_id
      JOIN products p ON sp.product_id = p.id
      WHERE s.id = $1
      GROUP BY s.id
    `, [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const salesRepository = {
  createSale,
  getAllSales,
  getSaleById,
};

export default salesRepository;
