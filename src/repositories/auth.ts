import { getPool } from "../config/database";
import httpStatus from "http-status";
import { throwError } from "../errors/customError";

async function getUserByEmail(email: string) {
  const pool = getPool();
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function createUser(email: string, hashedPassword: string, name: string) {
  const pool = getPool();
  try {
    const result = await pool.query(
    'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, name]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

const authRepository = {
  getUserByEmail,
  createUser
}

export default authRepository;