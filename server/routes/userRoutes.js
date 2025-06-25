import express from "express";
import { getAllUsers, getUserChallenges} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/",verifyToken, getAllUsers);
router.get("/:user_id",verifyToken, getUserChallenges);

export default router;
