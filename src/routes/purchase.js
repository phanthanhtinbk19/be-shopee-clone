import express from "express";
import {
	addToCart,
	deleteManyPurchase,
	getAllPurchase,
	updatePurchase,
} from "../controllers/PurchaseController";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/", getAllPurchase);
router.put("/update-purchase", updatePurchase);
router.delete("/", deleteManyPurchase);

export default router;
