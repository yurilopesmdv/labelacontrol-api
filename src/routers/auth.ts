import { Router } from "express";
import authSchema from "../schemas/auth";
import validations from "../middlewares/validateEntries";
import authController from "../controllers/auth";

const authRouter = Router();

authRouter
  .post(
    "/login",
    validations.validateBody(authSchema.signIn),
    authController.signIn
  )
  .post(
    "/create-user",
    validations.validateBody(authSchema.createUser),
    authController.createUser
  );

export default authRouter;