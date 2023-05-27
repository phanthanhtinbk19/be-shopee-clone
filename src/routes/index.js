import authRouter from "./auth.js";
import userRouter from "./user.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";
import purchaseRouter from "./purchase.js";

let initialRoutes = (app) => {
	app.use("/api/auth", authRouter);
	app.use("/api/users", userRouter);

	app.use("/api/products", productRouter);
	app.use("/api/categories", categoryRouter);
	app.use("/api/purchases", purchaseRouter);
};
export default initialRoutes;
