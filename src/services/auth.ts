import authRepository from "../repositories/auth";
import { throwError } from "../errors/customError";
import bcrypt from "bcrypt";

async function signIn(email: string, password: string) {
  const user = await authRepository.getUserByEmail(email);
  console.log(user)
  if (!user) {
    throwError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throwError(401, "Invalid credentials");
  }
  delete user.password_hash;
  return user;
}

async function createUser(email: string, password: string, name: string) {
  const existingUser = await authRepository.getUserByEmail(email);
  if (existingUser) {
    throwError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const result = await authRepository.createUser(email, hashedPassword, name);
  return result;
}

const authService = {
  signIn,
  createUser
}

export default authService;