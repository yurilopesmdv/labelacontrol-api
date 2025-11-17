import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

function validateBody<T>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = (schema as any).validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        message: "Validation error",
        details: error.details.map((detail: any) => detail.message),
      });
    }
    next();
  };
}

function validateQuery<T>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = (schema as any).validate(req.query, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: "Validation error",
        details: error.details.map((detail: any) => detail.message),
      });
    }
    next();
  };
}

const validations = {
  validateBody,
  validateQuery,
}

export default validations;