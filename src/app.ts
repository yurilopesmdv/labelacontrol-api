import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.set("trust proxy", true);

app.use(cors())
	.use(express.json({ limit: '10mb' }))
	.use(express.urlencoded({ extended: true, limit: '10mb' }))
	.use("/auth", authRouter)
	.use(errorHandler)

export function init(): Promise<Express> {
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
}

export default app;