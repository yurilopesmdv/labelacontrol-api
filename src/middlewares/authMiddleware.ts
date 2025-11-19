import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { throwError } from "../errors/customError";

import authRepository from "../repositories/auth";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throwError(401, "Access denied. No token provided.");
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };

    const user = await authRepository.getUserById(payload.userId);
    if (!user) {
      throwError(401, "Invalid token. User not found.");
      return;
    }

    // Attach to res.locals as per best practices and to match authentication.ts
    res.locals.userId = payload.userId;
    next();
  } catch (err) {
    throwError(401, "Invalid token.");
  }
}
