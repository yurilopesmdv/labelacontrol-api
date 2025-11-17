import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { CustomError } from "../errors/customError";
import { UserRepository } from "../modules/users/repositories/userRepository";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return next(new CustomError("Unauthorized", httpStatus.UNAUTHORIZED));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(payload.email);

    if (!user) {
      return next(new CustomError("Unauthorized", httpStatus.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new CustomError("Forbidden", httpStatus.FORBIDDEN));
  }
}
