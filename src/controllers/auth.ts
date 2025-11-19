import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import authService from "../services/auth";

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.signIn(email, password);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;
    const response = await authService.createUser(email, password, name);
    res.status(httpStatus.CREATED).json({ id: response.id });
  } catch (error) {
    next(error);
  }
}

const authController = {
  signIn,
  createUser
};

export default authController;
