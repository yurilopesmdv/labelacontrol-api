import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import customerRouter from "./routers/customers";
import supplierRouter from "./routers/suppliers";
import productRouter from "./routers/products";
import salesRouter from "./routers/sales";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.set("trust proxy", true);

app.use(cors())
	.use(express.json({ limit: '10mb' }))
	.use(express.urlencoded({ extended: true, limit: '10mb' }))
	.use("/auth", authRouter)
	.use("/customers", customerRouter)
	.use("/suppliers", supplierRouter)
	.use("/products", productRouter)
	.use("/sales", salesRouter)
	.use(errorHandler)

export function init(): Promise<Express> {
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
}

export default app;