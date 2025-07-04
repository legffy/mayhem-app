import express from "express";
import { getAllChallenges, createChallenge, getUserChallenges} from "../controllers/challengeController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();
router.get("/",verifyToken, getAllChallenges);
router.post("/", verifyToken, createChallenge);
router.get("/:user_id",verifyToken,getUserChallenges);

export default router;

