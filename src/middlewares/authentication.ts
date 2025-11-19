import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { throwError } from "../errors/customError";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    throwError(401, "Access denied. No token provided.");
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throwError(401, "Access denied. No token provided.");
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secret) as { userId: number };
    res.locals.userId = decoded.userId;
    next();
  } catch (error) {
    throwError(401, "Invalid token.");
  }
}
