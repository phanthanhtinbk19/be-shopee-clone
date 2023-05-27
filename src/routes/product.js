import express from "express";
import {
	createProduct,
	getAllProduct,
	getProductById,
} from "../controllers/ProductController";
import {verifyToken} from "../middleware/verifyToken";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);

export default router;
