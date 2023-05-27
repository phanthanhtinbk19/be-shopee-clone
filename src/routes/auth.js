import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.post("/refresh", handleRefreshToken);

export default router;
