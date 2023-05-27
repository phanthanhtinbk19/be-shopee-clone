import express from "express";
import {getProfile, updateProfile} from "../controllers/UserController";
import {verifyToken} from "../middleware/verifyToken";

const router = express.Router();

router.get("/me", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
