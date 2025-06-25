import express from "express";
import { getAllChallenges, createChallenge} from "../controllers/challengeController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();
router.get("/",verifyToken, getAllChallenges);
router.post("/", verifyToken, createChallenge);

export default router;

