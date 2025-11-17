import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction): Response {
  console.log("Error caught by errorHandler middleware:", err);
  const status = err.statusCode || 500;

  return res.status(status).json({
    statusCode: status,
    message: err.message,
  });
}

